import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite solo solicitudes desde este origen
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos HTTP (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)

@app.get("/price")
async def get_bitcoin_price(date_time: str):
    try:
        # Convierte la cadena de texto a un objeto datetime
        dt_obj = datetime.strptime(date_time, "%d-%m-%Y")
        # Calcula el timestamp de la medianoche de esa fecha
        timestamp = int(dt_obj.replace(hour=0, minute=0, second=0, microsecond=0).timestamp())
        url = f"https://api.coingecko.com/api/v3/coins/bitcoin/history"
        params = {
            'date': dt_obj.strftime("%d-%m-%Y"),
            'localization': 'false'
        }
        
        # Realiza la solicitud a la API de CoinGecko
        response = requests.get(url, params=params)
        data = response.json()

        # Verifica si los datos contienen el precio
        if 'market_data' in data and 'current_price' in data['market_data']:
            price = data['market_data']['current_price']['usd']
            return {"date_time": date_time, "price_usd": price}
        else:
            raise HTTPException(status_code=404, detail="Precio no encontrado o datos incorrectos")
    except ValueError:
        raise HTTPException(status_code=400, detail="Formato de fecha inválido. Use DD-MM-YYYY.")
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error en la solicitud a CoinGecko: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en el procesamiento de la solicitud: {str(e)}")
