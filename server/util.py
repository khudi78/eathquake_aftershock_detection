import pickle
import json
import numpy as np
import pandas as pd

# Global variables
__clf_aftershock = None
__clf_magnitude = None
__data_columns = None
__df = None   # to keep your dataframe (for last datetime)

def load_saved_artifacts():
    global __clf_aftershock
    global __clf_magnitude
    global __data_columns
    global __df

    print("loading saved artifacts...start")

    with open("./artifacts/aftershock_model.pkl", "rb") as f:
        __clf_aftershock = pickle.load(f)

    with open("./artifacts/aftershock_magnitude_model.pkl", "rb") as f:
        __clf_magnitude = pickle.load(f)

    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)["data_columns"]

    # Load your dataframe (assuming it's stored as a CSV or pickle for last datetime)
    __df = pd.read_csv("./artifacts/quake.csv")
    __df['Datetime'] = pd.to_datetime(__df['Date'] + ' ' + __df['Time'], errors='coerce', infer_datetime_format=True)

    print("loading saved artifacts...done")


def predict_aftershock(lat, long, dep, mag, time, date):
    dt = pd.to_datetime(date + " " + time, format="%m/%d/%Y %H:%M:%S")
    last_dt = __df["Datetime"].iloc[-1]
    inter_event = (dt - last_dt).total_seconds()

    # Full vector for classifier
    x = np.zeros(len(__data_columns))
    x[0] = lat
    x[1] = long
    x[2] = dep
    x[3] = mag
    x[4] = dt.year
    x[5] = dt.month
    x[6] = dt.day
    x[7] = dt.hour
    x[8] = dt.minute
    x[9] = dt.second
    x[10] = inter_event

    # Step 1: Aftershock classification
    is_aftershock = __clf_aftershock.predict([x])[0]

    if is_aftershock == 1:
        # Step 2: predict magnitude
        mag_index = __data_columns.index("magnitude")
        x_reg = np.delete(x, mag_index)
        predicted_mag = __clf_magnitude.predict([x_reg])[0]
        return {"Aftershock": True, "Predicted_Magnitude": float(predicted_mag)}
    else:
        return {"Aftershock": False, "Predicted_Magnitude": None}




if __name__ == '__main__':
    load_saved_artifacts()
    print(predict_aftershock(-2.61,125.95,20.00,8.2,'00:11:17','01/24/1965'))
    print(predict_aftershock(37.40,141.41,11.94,5.5,'20:08:28','12/30/2016'))
