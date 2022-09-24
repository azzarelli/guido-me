from flask import Flask  # Import flask
from flask_socketio import *



app = Flask(__name__,  static_url_path='')  # Setup the flask app by creating an instance of Flask
socketio = SocketIO(app, cors_allowed_origins=["http://127.0.0.1:5000"])

@app.route('/')
def home():  # At the same home function as before
    return app.send_static_file('index.html')  # Return index.html from the static folder



# SocketIO Events
@socketio.on('connect')
def connected():
    print('Connected')

@socketio.on('disconnect')
def disconnected():
    print('Disconnected')

@socketio.on('TextAdded')
def userAdded(message):
    print('Text Added')
    emit('textAddedResponse', {'data': message}, broadcast=True)

if __name__ == '__main__':  # If the script that was run is this script (we have not been imported)
    app.run()  # Start the server

    socketio.run(app, debug=True)