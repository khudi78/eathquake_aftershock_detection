# 🌎 Earthquake Aftershock Detection

## Overview
This project predicts whether an earthquake event will trigger an **aftershock** and estimates the **magnitude** of the aftershock if it occurs. It uses a combination of **classification** and **regression** machine learning models.

- **Classification**: Determines if an aftershock will occur.  
- **Regression**: Predicts the magnitude of the aftershock.  

The project provides a **Flask API** for making predictions based on earthquake input data.

---

          ┌─────────────────────────┐
          │  Input Earthquake Data  │
          │ (lat, long, depth, mag,│
          │   date, time)          │
          └─────────────┬─────────┘
                        │
                        ▼
         ┌───────────────────────────┐
         │ Aftershock Classification │
         │   (RandomForestClassifier)│
         └─────────────┬────────────┘
                       │
           ┌───────────┴───────────┐
           │                       │
       Aftershock = No         Aftershock = Yes
           │                       │
           ▼                       ▼
      Output:                     ┌─────────────────────────────┐
    {"Aftershock": False,           │ Aftershock Magnitude Regression │
     "Predicted_Magnitude": null}  │  (RandomForestRegressor)     │
                                   └─────────────┬─────────────┘
                                                 │
                                                 ▼
                                       Output: {"Aftershock": True,
                                                "Predicted_Magnitude": 5.8}

                                                

---

## Features
- **Predict likelihood of an aftershock** (`Yes` / `No`)  
- **Estimate magnitude** of the aftershock if it occurs  
- Accepts inputs: Latitude, Longitude, Depth, Magnitude, Date, and Time  
- Pre-trained ML models for fast predictions  
- Flask API for easy integration with web or mobile applications  

---

## Technologies
- **Python 3.12**  
- **Flask** – API development  
- **Pandas & NumPy** – Data manipulation  
- **Scikit-Learn** – Machine learning (RandomForestClassifier & RandomForestRegressor)  
- **Pickle & JSON** – Saving/loading models and column data  

---

## How the Models Work

1. Aftershock Classification
   - **Model**: RandomForestClassifier
   - **Purpose**: Predicts if an earthquake will trigger an aftershock.
   - **Features used**: latitude, longitude, depth, magnitude, datetime (year, month, day, hour, minute, second), inter-event time.

2. Aftershock Magnitude Regression
   - **Model**: RandomForestRegressor
   - **Purpose**: Estimates the magnitude of the aftershock.
   - **Features used**: All features used in classification except the earthquake’s magnitude.
   - **Learns patterns like**:
      - Depth vs. aftershock magnitude
      - Location vs. aftershock magnitude
      - Inter-event time vs. aftershock magnitude
