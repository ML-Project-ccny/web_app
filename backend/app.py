from flask import Flask, request
from model import ASLResnet,ImageClassificationBase
import torch 
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import or_,and_
import torchvision.transforms as tt
from os.path import exists
import numpy as np
from PIL import Image


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
db = SQLAlchemy(app)
CORS(app)

#create db model
class User(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    email = db.Column(db.String(200),nullable=False)
    password = db.Column(db.String(200),nullable=False)

    def __init__(self,email,password):
        self.email = email
        self.password = password

class Words(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    level = db.Column(db.Integer,nullable=False)
    word = db.Column(db.String(200),nullable=False)
    score = db.Column(db.Integer,default=0)
    
# Load the model
pytorch_model = ASLResnet()

## set params from the saved state of model
pytorch_model.load_state_dict(torch.load('model.pt', map_location=torch.device('cpu')), strict=False)
# pytorch_model.load_state_dict(torch.load('model.pt'), strict=False)

pytorch_model.eval()

#template {level:[words...],...}
APP_WORDS = {1:['Able','Love','Buy','Cube','Wavy','Bowl','Claw','You','Clay','Clue'],
2:['Risk','Sir','Kids','Verb','Dark','Feud',"Four",'Cake'],
3:['Foxy','Onyx','Gown','Honk','Minx','Hack','Claw','Hawk','Hack','Numb']}

@app.route('/',methods=['POST'])
def index():
    # Get the data from the POST request.
    data = request.get_json(force=True)
    height,width = data['height'], data['width']

    array = np.array(data['data'], np.uint8)
    array = np.reshape(array, (height, width, 4))

    new_image = Image.fromarray(array)
    tfms = tt.Compose([tt.Resize((200, 200)),
                        tt.ToTensor()])
    
    img_transform = tfms(new_image)
    img_transform.unsqueeze_(0)
    img_transform = img_transform[:, :3, :, :]

    res = pytorch_model(img_transform)
    print('\n')
    print(res)
    print('\n')
    print("max value in array                 ", torch.max(res).tolist())
    print("index of max value (prediction)    ", torch.argmax(res).tolist())
    print('\n')
    return "HELLO"

@app.route('/user',methods=['POST','GET'])
def user():
    data = request.get_json(force=True)
    if not data['email'] or not data['password']:
        return "Not valid information"
    email,password = data['email'],data['password']
    
    if request.method == 'POST':
        #checking if email exits
        try:
            found_user = User.query.filter_by(email=email).first()
            if found_user:
                return "email already in use"
        except:
            return "something went wrong"
        #creating user
        new_user = User(email,password)
        try:
            db.session.add(new_user)
            db.session.commit()
            createWords(new_user.id)
            return "user created"
        except:
            return "error occured"

    elif request.method == 'GET':
        found_user = User.query.filter(email==email,password==password).first()
        if found_user:
            return "Login in"
        return "invalid infomation"

@app.route('/word',methods=['GET','PATCH'])
def words():
    data = request.get_json(force=True)
    if not data['email'] :
        return "Not valid information"
    email = data['email']
    user = User.query.filter_by(email=email).first()
    if request.method == 'GET': 
        # words =  db.session.execute(Words.query.filter_by(Words.user_id=user.id))
        words = db.session.query(Words).filter(Words.user_id == user.id)
        res = []
        for r in words:
            res.append({'level':r.level,'word':r.word,'score':r.score})
        return res

    if request.method == 'PATCH': 
        level,word,score = data['level'],data['word'],data['score']
        if not level or not word or not score:
            return "Not Valid info"
        old_word = Words.query.filter(level==level,word==word,Words.user_id==user.id).first()
        old_word.score = score
        db.session.commit()
        return 'score updated'
@app.route('/allWords',methods=['GET'])
def getAllWords():
    return APP_WORDS


def createWords(id):
    word = Words(user_id=id,level=1,word='word')
    try:
        db.session.add(word)
        db.session.commit()
        return "user created"
    except:
        return "error occured"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5000,debug=True)