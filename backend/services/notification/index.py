from flask import Flask, request
from flask_mail import Mail, Message
import pymongo

app = Flask(__name__)
mail = Mail(app)


app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'jalas.piedpipers@gmail.com'
app.config['MAIL_PASSWORD'] = 'Pied@Pipers123'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)


@app.route("/api/sendEmail", methods=['POST'])
def sendEmail():
    data = request.json
    recipients = data["recipients"]
    subject = data["subject"]
    msg = Message(subject, sender='jalas.piedpipers@gmail.com',
                  recipients=recipients)
    msg.body = data['message']
    mail.send(msg)
    return "Sent"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3003)
