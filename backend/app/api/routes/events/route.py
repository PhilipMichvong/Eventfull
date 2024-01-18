from fastapi import APIRouter, HTTPException, status
from bs4 import BeautifulSoup
import requests


router = APIRouter(
    prefix="/api/events",
    tags=["Events"]
)


def __scrap_events(url : str): 
    """Funkcja przeznaczona do pobierania zawartości strony"""
    response = requests.get(url)
    if response.status_code != 200:
        return "Błąd podczas pobierania strony"
    
    # Parsowanie HTML
    soup = BeautifulSoup(response.text, 'html.parser')

    # Znajdowanie wszystkich wydarzeń
    events = soup.find_all('a', {'class': 'featured_event'})

    # Wyodrębnianie informacji o każdym wydarzeniu
    events_dict = {}
    for i, event in enumerate(events):
        name = event.find('span', {'class': 'evoet_title'})
        start_date = event.find('span', {'class': 'evo_start'})
        end_date = event.find('span', {'class': 'evo_end'})
        location = event.find('span', {'class': 'event_location_attrs'})

        events_dict[f'event_{i+1}'] = {
            'name': name.get_text(strip=True) if name and hasattr(name, 'get_text') else 'Brak danych',
            'start_date': start_date.get_text(strip=True) if start_date and hasattr(start_date, 'get_text') else 'Brak danych',
            'end_date': end_date.get_text(strip=True) if end_date and hasattr(end_date, 'get_text') else 'Brak danych',
            'location': location['data-location_name'] if location and hasattr(location, 'get_text') else 'Brak danych'
        }

    return events_dict

@router.get("/", status_code=status.HTTP_200_OK)
def get_latest_events():
    url = "https://warsawtour.pl/co-gdzie-kiedy/"
    return __scrap_events(url)
