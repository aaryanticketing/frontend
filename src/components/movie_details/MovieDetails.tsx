import { useLocation } from 'react-router-dom';
import styles from "./MovieDetails.module.css";
import { useState, useEffect } from 'react';
import axios from 'axios';


interface LocTime {
    loc_name: string;
    times: string;
    location_id: string; // or number, depending on your data
    time_id: string; // or number, depending on your data
    seats: string;
}

function MovieDetails(){
    const location = useLocation();
    const { title, imgUrl, description, id, start_date, end_date, amount } = location.state;

    const [startDate, setStartDate] = useState(start_date);
    const [endDate, setEndDate] = useState(end_date);
    const [locTimes, setLocTimes] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [numTickets, setNumTickets] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');
    
    useEffect(() => {
        setStartDate(new Date(startDate).toISOString().split("T")[0]);
        setEndDate(new Date(endDate).toISOString().split("T")[0]);
    }, []);

    useEffect(() => {
    axios.request({
        url: "/t/aaryan/oauth2/token",
        method: "post",
        baseURL: "https://api.asgardeo.io/",
        auth: {
            username: "9AKXBzRqLYBkVXZalZTPfm7WGqAa",
            password: "_DQWfSVBuq1ydjSgRf4lbwwOESf7crmwXy14fu0wIvsa"
        },
        data: {
            "grant_type": "client_credentials",
            "scope": "public"
        }
    }).then((res) => {
         axios.get(`${window.config.todoApiUrl}/locationTimes`,
            {
                headers: {
                'Authorization': `Bearer ${res.data.access_token}`
                }
            }).then((res1) => {
                const movies = res1.data;
                setLocTimes(movies);
            })
        });}, []);

        const uniqueLocations = locTimes.reduce((unique: string[], locTime: { loc_name: string }) => {
            return unique.includes(locTime.loc_name) ? unique : [...unique, locTime.loc_name];
        }, []);


        const handleButtonClick = () => {
            
            // write a code to show the IDs of the selected location and time
                locTimes.map((locTime: LocTime) => {
                    if (locTime.loc_name === selectedLocation && locTime.times === selectedTime) {
                        axios.request({
                            url: "/t/aaryan/oauth2/token",
                            method: "post",
                            baseURL: "https://api.asgardeo.io/",
                            auth: {
                                username: "9AKXBzRqLYBkVXZalZTPfm7WGqAa",
                                password: "_DQWfSVBuq1ydjSgRf4lbwwOESf7crmwXy14fu0wIvsa"
                            },
                            data: {
                                "grant_type": "client_credentials",
                                "scope": "public"
                            }
                        }).then((res) => {
                             axios.get(`${window.config.todoApiUrl}/show/${id}/${locTime.location_id}/${locTime.time_id}/${selectedDate}`,
                                {
                                    headers: {
                                    'Authorization': `Bearer ${res.data.access_token}`
                                    }
                                }).then((res1) => {
                                    if (res1.data.length === 0) { 
                                        axios.put(`${window.config.todoApiUrl}/show`, 
                                            {
                                                "date_selected": selectedDate,
                                                "location_id": locTime.location_id,
                                                "movie_id": id,
                                                "seats_left": String(Number(locTime.seats) - numTickets),
                                                "time_id": locTime.time_id,
                                                "id":""
                                              }
                                        , {
                                            headers: {
                                                'Authorization': `Bearer ${res.data.access_token}`
                                            }
                                        }).then((res2) => {
                                            axios.post(`${window.config.todoApiUrl}/ticket`, 
                                            {
                                                "amount": String(Number(amount) * numTickets),
                                                "id": "",
                                                "movie_id": id,
                                                "qty": String(numTickets),
                                                "show_id": res2.data.id,
                                                "user_id": "user@gmail.com"
                                              }
                                        , {
                                            headers: {
                                                'Authorization': `Bearer ${res.data.access_token}`
                                            }
                                        }).then((res3) => {
                                            alert(`created show id: ${res2.data.id} and ticket id: ${res3.data.id}`);
                                        }).catch((error) => {
                                            console.error(error);
                                        });
                                        }).catch((error) => {
                                            console.error(error);
                                        });
                                    } else {
                                        if (res1.data[0].seats_left < numTickets) {
                                            alert(`No available tickets please use another dates or locations or times`);
                                        } else{
                                            axios.put(`${window.config.todoApiUrl}/show`, 
                                            {
                                                "date_selected": selectedDate,
                                                "location_id": locTime.location_id,
                                                "movie_id": id,
                                                "seats_left": String(Number(res1.data[0].seats_left) - numTickets),
                                                "time_id": locTime.time_id,
                                                "id": res1.data[0].id
                                              }

                                        , {
                                            headers: {
                                                'Authorization': `Bearer ${res.data.access_token}`
                                            }
                                        }).then((res2) => {
                                            axios.post(`${window.config.todoApiUrl}/ticket`, 
                                            {
                                                "amount": String(Number(amount) * numTickets),
                                                "id": "",
                                                "movie_id": id,
                                                "qty": String(numTickets),
                                                "show_id": res2.data.id,
                                                "user_id": "user@gmail.com"
                                              }
                                        , {
                                            headers: {
                                                'Authorization': `Bearer ${res.data.access_token}`
                                            }
                                        }).then((res3) => {
                                            alert(`created show id: ${res2.data.id} and ticket id: ${res3.data.id}`);
                                        }).catch((error) => {
                                            console.error(error);
                                        });
                                        }).catch((error) => {
                                            console.error(error);
                                        });
                                        }
                                        
                                    }
                                })
                            });
                    }
                });
            };
            console.log(`${id} ${start_date} ${end_date}`);

    return (
        <div className={styles.container}>
            <img className={styles.banner} src={imgUrl} />
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>
            <label htmlFor="start">Show Date:</label>
            <input type="date" min={startDate} max={endDate} value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
            
            <label htmlFor="location">Location:</label>
            <select id="location" value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}>
                {uniqueLocations.map((locName) => (
                    <option key={locName} value={locName}>
                        {locName}
                    </option>
                ))}
            </select>

            <label htmlFor="time">Time:</label>
            <select id="time" value={selectedTime} onChange={e => setSelectedTime(e.target.value)}>
                {(locTimes as LocTime[])
                    .filter(locTime => locTime.loc_name === selectedLocation)
                    .map((locTime) => (
                        <option key={locTime.time_id} value={locTime.times}>
                            {locTime.times}
                        </option>
                    ))
                }
            </select>

            <label htmlFor="tickets">Number of Tickets:</label>
            <input type="number" id="tickets" min="1" value={numTickets} onChange={e => setNumTickets(Number(e.target.value))} />

            <button onClick={handleButtonClick}>Show IDs</button>
        
            
        

        </div>
    );
}

export default MovieDetails;
