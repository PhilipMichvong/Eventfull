import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Container, TextField, Box, Dialog, DialogTitle, DialogContent, CardActionArea, CircularProgress, Button } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Events.css'
import { styled } from '@mui/material';
const theme = createTheme();

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  '&:hover': {
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
  },
}));

const StyledTextField = styled(TextField)({
  margin: '20px 0',
  width: '100%',
  '.MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: 'blue',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

const EventfullLogo = styled('div')(({ theme }) => ({
  fontSize: '4rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),

}));

const EventsScreen = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [mapPosition, setMapPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8090/api/events/');
        setEvents(Object.values(response.data));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
      setIsLoading(false);
    };

    fetchEvents();
  }, []);

  const geocodeLocation = async (locationName) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${locationName}`);
      if (response.data && response.data.length > 0) {
        return [parseFloat(response.data[0].lat), parseFloat(response.data[0].lon)];
      }
    } catch (error) {
      console.error('Error during geocoding:', error);
    }
    return null;
  };

  const handleCardClick = async (event) => {
    setSelectedEvent(event);
    const coordinates = await geocodeLocation(event.location);
    if (coordinates) {
      setMapPosition(coordinates);
      setOpenDialog(true);
    } else {
      // Ustawiamy mapPosition na null i pokazujemy dialog z komunikatem
      setMapPosition(null);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
    setMapPosition(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addToCalendar = (selectedEvent) => {
    const formatGoogleCalendarDate = (date) => {
      // Formatowanie daty do formatu wymaganego przez Google Calendar
      return date.replace(/-|:/g, '') + 'Z';
    };
  
    const startDate = formatGoogleCalendarDate(parseCustomDate(selectedEvent.start_date));
    let endDate = startDate;
  
    if (selectedEvent.end_date && selectedEvent.end_date !== 'Brak danych') {
      endDate = formatGoogleCalendarDate(parseCustomDate(selectedEvent.end_date));
    }
  
    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(selectedEvent.name)}&dates=${startDate}/${startDate}&details=${encodeURIComponent('Szczegóły wydarzenia: ' + selectedEvent.location)}`;
    window.open(calendarUrl, '_blank');
  };
  

  const navigateToLocation = (location) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(googleMapsUrl, '_blank');
  };

  const parseCustomDate = (dateStr) => {
    const monthMappings = {
      sty: '01', lut: '02', mar: '03', kwi: '04', maj: '05', cze: '06', 
      lip: '07', sie: '08', wrz: '09', paź: '10', lis: '11', gru: '12'
    };
    const year = new Date().getFullYear(); // Zakładamy bieżący rok
  
    // Sprawdzamy, czy data zawiera godzinę
    const dateTimeMatch = dateStr.match(/(\d{2})(\w{3})(\d{2}):(\d{2})/);
    if (dateTimeMatch) {
      const [, day, month, hour, minute] = dateTimeMatch;
      return `${day}-${monthMappings[month]}-${year} ${hour}:${minute}`;
    }
  
    // Sprawdzamy, czy data zawiera tylko dzień i miesiąc
    const dateMatch = dateStr.match(/(\d{2})(\w{3})/);
    if (dateMatch) {
      const [, day, month] = dateMatch;
      return `${day}-${monthMappings[month]}-${year}`; // Zwracamy datę bez konkretnej godziny
    }
  
    return dateStr; // Jeśli format daty nie pasuje, zwracamy oryginalny ciąg
  };

  const openGoogleSearch = (eventName) => {
    const query = encodeURIComponent(eventName);
    const url = `https://www.google.com/search?q=${query}`;
    window.open(url, '_blank');
  };
  
  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
      <EventfullLogo>Eventfull</EventfullLogo>
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
          <StyledTextField
            variant="outlined"
            label="Szukaj wydarzenia"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          events.filter(event => event.name.toLowerCase().includes(searchTerm.toLowerCase())).map((event, index) => (
            <StyledCard key={index} sx={{ mb: 2 }} onClick={() => handleCardClick(event)}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    <EventIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {event.name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    <DateRangeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Start: {parseCustomDate(event.start_date)}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    <DateRangeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    End: {event.end_date !== 'Brak danych' ? parseCustomDate(event.end_date) : 'Brak danych'}
                  </Typography>
                  <Typography variant="body1">
                    <LocationOnIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Location: {event.location}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </StyledCard>
          ))
        )}
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
  <DialogTitle>{selectedEvent?.name}</DialogTitle>
  <DialogContent>
    {mapPosition ? (
      <MapContainer center={mapPosition} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={mapPosition}>
          <Popup>
            {selectedEvent?.location}
          </Popup>
        </Marker>
      </MapContainer>
    ) : (
      <Typography variant="body1" color="textSecondary">
        Naszemu algorytmowi nie udało się wskazać lokalizacji, jednak spróbuj kliknąć guzik nawiguj, google napewno sobie poradzi :) 
      </Typography>
    )}
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <Button onClick={() => addToCalendar(selectedEvent)} variant="contained" color="primary">
        Dołącz teraz
      </Button>
      <Button onClick={() => navigateToLocation(selectedEvent?.location)} variant="contained" color="secondary" sx={{ ml: 2 }}>
        Nawiguj
      </Button>
      <Button onClick={() => openGoogleSearch(selectedEvent?.name)}  variant="contained" color="primary" sx={{ ml: 2 }}>
      Czytaj więcej
    </Button>
    </Box>
  </DialogContent>
</Dialog>

      </Container>
    </ThemeProvider>
  );
};

export default EventsScreen;
