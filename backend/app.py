import os
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from datetime import datetime

app = Flask(__name__, template_folder='../frontend/templates', static_folder='../frontend/static')
app.secret_key = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:qkrwjddhks1!@localhost/your_database_name' # MySQL 연결 정보

app.config['UPLOAD_FOLDER'] = 'uploads'
db = SQLAlchemy(app)

# 메인 화면
@app.route('/')
def index():
    if 'username' in session:  # 세션에 사용자 이름이 있는지 확인
        username = session['username']
        return render_template('index.html', username=username, logged_in=True)  # 템플릿에 로그인된 사용자 정보 전달
    else:
        return render_template('index.html', logged_in=False)  # 템플릿에 로그인되지 않은 상태 전달

@app.route('/section1')
def section1():
    return render_template('section1.html')

@app.route('/section2')
def section2():
    return render_template('section2.html')

@app.route('/section3')
def section3():
    return render_template('section3.html')


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        
        # 이미 존재하는 사용자명 또는 이메일인지 확인
        if User.query.filter_by(username=username).first() is not None:
            session['show_modal'] = True
            return redirect(url_for('register'))
        if User.query.filter_by(email=email).first() is not None:
            session['show_modal'] = True
            return redirect(url_for('register'))

        # 존재하지 않으면 새로운 사용자 생성
        password = request.form['password']
        new_user = User(username=username, email=email, password=password)  # 예시: 새 사용자 생성
        db.session.add(new_user)
        db.session.commit()
        # 새 사용자 저장 등의 처리

        # 성공 메시지를 세션에 저장
        session['success_message'] = '회원가입이 성공적으로 완료되었습니다.'
        return redirect(url_for('login'))  # 로그인 페이지로 이동

    # GET 요청인 경우
    return render_template('register.html', show_modal=session.pop('show_modal', False))

    

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        # 사용자 확인
        user = User.query.filter_by(username=username).first()
        if user and user.password == password:
            session['username'] = username
            return redirect(url_for('index'))  # 로그인 후 메인 화면으로 리다이렉트
        else:
            session['login_failed'] = True  # 로그인 실패 상태를 세션에 저장
            return redirect(url_for('login'))  # 로그인 페이지로 이동

    # GET 요청인 경우에는 로그인 실패 상태를 체크하지 않음
    return render_template('login.html', login_failed=session.pop('login_failed', False))

# 로그아웃
@app.route('/logout')
def logout():
    # 세션에서 사용자 정보 삭제
    session.pop('username', None)
    return redirect(url_for('index'))  # 메인 페이지로 리다이렉트

@app.route('/upload', methods=['POST'])
def upload():
    try:
        image_data = request.files['file']
        target_page = request.form.get("targetPage")
        target_folder = ""

        # Debugging log
        app.logger.debug(f"Received targetPage: {target_page}")

        if target_page == "section1":
            target_folder = "plant_images"
        elif target_page == "section3":
            target_folder = "soil_images"

        target_path = os.path.join(app.config['UPLOAD_FOLDER'], target_folder)
        if not os.path.exists(target_path):
            os.makedirs(target_path)

        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S%f')
        filename = secure_filename(f'{timestamp}.png')
        image_path = os.path.join(target_path, filename)
        image_data.save(image_path)

        session['image_filename'] = filename
        session['message'] = "Image captured and saved successfully."
        return jsonify({"message": "Image captured and saved successfully."}), 200
    except Exception as e:
        session['message'] = f"Image upload failed: {str(e)}"
        app.logger.error(f"Image upload failed: {str(e)}")
        return jsonify({"error": str(e)}), 500
        
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)
