from flask import Flask, request, jsonify
from flask_cors import CORS
import util

app = Flask(__name__)
CORS(app)

@app.route('/prediction_of_aftershock', methods=['GET', 'POST'])
def prediction_of_aftershock():
    data = request.get_json()  # <-- read JSON body

    latitude = float(data['latitude'])
    longitude = float(data['longitude'])
    depth = float(data['depth'])
    magnitude = float(data['magnitude'])
    time = data['time']
    date = data['date']

    response = jsonify({
        'aftershock_prediction': util.predict_aftershock(latitude, longitude, depth, magnitude, time, date)
    })

    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/home')
def home():
    return "hello"

if __name__ == '__main__':
    print("server for flask is started......")
    util.load_saved_artifacts()
    print(app.url_map)
    app.run(debug=True,port=5001)
