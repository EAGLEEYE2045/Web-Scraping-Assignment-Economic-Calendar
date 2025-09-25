import React, { useEffect, useState } from "react";

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [currencyFilter, setCurrencyFilter] = useState("");
  const [impactFilter, setImpactFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dayFilter, setDayFilter] = useState("all");

  const fetchEvents = () => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/economic-calendar")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.events || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Helper function to get day of week from date string
  const getDayOfWeek = (dateStr) => {
    const date = new Date(dateStr);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  if (loading) return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '24px',
      color: '#3498db'
    }}>
      Loading economic calendar...
    </div>
  );

  // Apply filters
  const filteredEvents = events.filter((event) => {
    return (
      (currencyFilter === "" || event.Currency === currencyFilter) &&
      (impactFilter === "" || event.Impact.toLowerCase().includes(impactFilter.toLowerCase())) &&
      (searchTerm === "" || event.Event.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Apply day filter
  let dayFilteredEvents = filteredEvents;
  if (dayFilter !== "all" && dayFilter !== "combined") {
    dayFilteredEvents = filteredEvents.filter((event) => {
      const eventDayOfWeek = getDayOfWeek(event.Day);
      return eventDayOfWeek.toLowerCase() === dayFilter.toLowerCase();
    });
  }

  // Group events based on selected day filter
  let groupedData = {};
  
  if (dayFilter === "combined") {
    groupedData["All Events This Week"] = dayFilteredEvents;
  } else {
    groupedData = dayFilteredEvents.reduce((acc, event) => {
      if (!acc[event.Day]) acc[event.Day] = [];
      acc[event.Day].push(event);
      return acc;
    }, {});
  }

  // Get unique currencies for dropdown
  const uniqueCurrencies = [...new Set(events.map((e) => e.Currency))];

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '40px',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            color: 'white',
            margin: '0',
            fontSize: '3rem',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            📅 Economic Calendar
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '1.1rem',
            margin: '10px 0 0 0'
          }}>
            Track important economic events and market indicators
          </p>
        </div>

        <div style={{ padding: '30px' }}>
          {/* Refresh Button */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <button 
              onClick={fetchEvents} 
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 25px rgba(102, 126, 234, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.3)';
              }}
            >
              🔄 Refresh Data
            </button>
          </div>

          {/* Filters */}
          <div style={{ 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '15px',
            padding: '25px',
            marginBottom: '30px',
            boxShadow: '0 10px 30px rgba(245, 87, 108, 0.2)'
          }}>
            <h3 style={{ 
              margin: '0 0 20px 0', 
              color: 'white',
              fontSize: '1.3rem',
              textAlign: 'center'
            }}>
              🎯 Filter Options
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              {/* Currency Filter */}
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: 'bold', 
                  color: 'white',
                  fontSize: '14px'
                }}>
                  💱 Currency
                </label>
                <select 
                  value={currencyFilter} 
                  onChange={(e) => setCurrencyFilter(e.target.value)}
                  style={{ 
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: 'none',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}
                >
                  <option value="">All Currencies</option>
                  {uniqueCurrencies.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Impact Filter */}
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: 'bold', 
                  color: 'white',
                  fontSize: '14px'
                }}>
                  ⚡ Impact Level
                </label>
                <select 
                  value={impactFilter} 
                  onChange={(e) => setImpactFilter(e.target.value)}
                  style={{ 
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: 'none',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}
                >
                  <option value="">All Impact Levels</option>
                  <option value="High">🔴 High Impact</option>
                  <option value="Medium">🟡 Medium Impact</option>
                  <option value="Low">🟢 Low Impact</option>
                </select>
              </div>

              {/* Day Filter */}
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: 'bold', 
                  color: 'white',
                  fontSize: '14px'
                }}>
                  📅 Day Filter
                </label>
                <select 
                  value={dayFilter} 
                  onChange={(e) => setDayFilter(e.target.value)}
                  style={{ 
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: 'none',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}
                >
                  <option value="all">All Days</option>
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                  <option value="combined">All Combined</option>
                </select>
              </div>

              {/* Search Filter */}
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: 'bold', 
                  color: 'white',
                  fontSize: '14px'
                }}>
                  🔍 Search Events
                </label>
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ 
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: 'none',
                    fontSize: '14px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Events Display */}
          {Object.keys(groupedData).length > 0 ? (
            Object.keys(groupedData)
              .sort((a, b) => {
                if (dayFilter === "combined") return 0;
                return new Date(a) - new Date(b);
              })
              .map((period) => (
                <div key={period} style={{ marginBottom: '40px' }}>
                  <div style={{ 
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '15px',
                    marginBottom: '20px',
                    textAlign: 'center',
                    boxShadow: '0 10px 25px rgba(79, 172, 254, 0.3)'
                  }}>
                    <h2 style={{ 
                      margin: '0',
                      fontSize: '1.5rem',
                      fontWeight: 'bold'
                    }}>
                      {dayFilter === "combined" ? period : 
                       `${period} (${getDayOfWeek(period)})`
                      }
                    </h2>
                    <p style={{ 
                      margin: '5px 0 0 0',
                      opacity: '0.9',
                      fontSize: '14px'
                    }}>
                      {groupedData[period].length} event{groupedData[period].length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  
                  <div style={{ 
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    backgroundColor: 'white'
                  }}>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ 
                        width: '100%', 
                        borderCollapse: 'collapse',
                        minWidth: '800px'
                      }}>
                        <thead>
                          <tr style={{ 
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white'
                          }}>
                            <th style={{ padding: '18px 15px', fontWeight: 'bold', textAlign: 'left' }}>⏰ Time</th>
                            {dayFilter === "combined" && <th style={{ padding: '18px 15px', fontWeight: 'bold', textAlign: 'left' }}>📅 Date</th>}
                            <th style={{ padding: '18px 15px', fontWeight: 'bold', textAlign: 'center' }}>💱 Currency</th>
                            <th style={{ padding: '18px 15px', fontWeight: 'bold', textAlign: 'center' }}>⚡ Impact</th>
                            <th style={{ padding: '18px 15px', fontWeight: 'bold', textAlign: 'left' }}>📈 Event</th>
                            <th style={{ padding: '18px 15px', fontWeight: 'bold', textAlign: 'center' }}>✅ Actual</th>
                            <th style={{ padding: '18px 15px', fontWeight: 'bold', textAlign: 'center' }}>🎯 Forecast</th>
                            <th style={{ padding: '18px 15px', fontWeight: 'bold', textAlign: 'center' }}>📊 Previous</th>
                          </tr>
                        </thead>
                        <tbody>
                          {groupedData[period]
                            .sort((a, b) => {
                              if (a.Day !== b.Day) {
                                return new Date(a.Day) - new Date(b.Day);
                              }
                              return a.Time.localeCompare(b.Time);
                            })
                            .map((event, idx) => (
                              <tr key={idx} style={{ 
                                backgroundColor: idx % 2 === 0 ? '#f8f9fa' : 'white',
                                borderLeft: `6px solid ${
                                  event.Impact === "High" ? '#e74c3c' : 
                                  event.Impact === "Medium" ? '#f39c12' : '#27ae60'
                                }`,
                                transition: 'all 0.3s ease'
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#e3f2fd';
                                e.currentTarget.style.transform = 'scale(1.01)';
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#f8f9fa' : 'white';
                                e.currentTarget.style.transform = 'scale(1)';
                              }}>
                                <td style={{ 
                                  padding: '15px', 
                                  fontWeight: 'bold',
                                  color: '#2c3e50',
                                  fontSize: '14px'
                                }}>
                                  {event.Time}
                                </td>
                                {dayFilter === "combined" && (
                                  <td style={{ 
                                    padding: '15px',
                                    color: '#7f8c8d',
                                    fontSize: '14px'
                                  }}>
                                    {event.Day}
                                  </td>
                                )}
                                <td style={{ padding: '15px', textAlign: 'center' }}>
                                  <span style={{
                                    background: 'linear-gradient(135deg, #3498db, #2980b9)',
                                    color: 'white',
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    boxShadow: '0 4px 8px rgba(52, 152, 219, 0.3)'
                                  }}>
                                    {event.Currency}
                                  </span>
                                </td>
                                <td style={{ padding: '15px', textAlign: 'center' }}>
                                  <span style={{
                                    padding: '8px 16px',
                                    borderRadius: '25px',
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    background: event.Impact === "High" 
                                      ? 'linear-gradient(135deg, #e74c3c, #c0392b)' 
                                      : event.Impact === "Medium" 
                                      ? 'linear-gradient(135deg, #f39c12, #e67e22)' 
                                      : 'linear-gradient(135deg, #27ae60, #229954)',
                                    color: 'white',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                  }}>
                                    {event.Impact === "High" ? "🔴 HIGH" :
                                     event.Impact === "Medium" ? "🟡 MED" : "🟢 LOW"}
                                  </span>
                                </td>
                                <td style={{ padding: '15px' }}>
                                  <a 
                                    href={event.Event_Link} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    style={{ 
                                      textDecoration: 'none', 
                                      color: '#3498db',
                                      fontWeight: '500',
                                      fontSize: '14px',
                                      transition: 'color 0.3s ease'
                                    }}
                                    onMouseOver={(e) => e.target.style.color = '#2980b9'}
                                    onMouseOut={(e) => e.target.style.color = '#3498db'}
                                  >
                                    {event.Event}
                                  </a>
                                </td>
                                <td style={{ 
                                  padding: '15px', 
                                  fontWeight: event.Actual ? 'bold' : 'normal',
                                  color: event.Actual ? '#27ae60' : '#95a5a6',
                                  textAlign: 'center',
                                  fontSize: '14px'
                                }}>
                                  {event.Actual || "—"}
                                </td>
                                <td style={{ 
                                  padding: '15px',
                                  color: '#7f8c8d',
                                  textAlign: 'center',
                                  fontSize: '14px'
                                }}>
                                  {event.Forecast || "—"}
                                </td>
                                <td style={{ 
                                  padding: '15px',
                                  color: '#7f8c8d',
                                  textAlign: 'center',
                                  fontSize: '14px'
                                }}>
                                  {event.Previous || "—"}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '80px 40px',
              background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
              borderRadius: '20px',
              margin: '30px 0'
            }}>
              <div style={{ fontSize: '60px', marginBottom: '20px' }}>📭</div>
              <h3 style={{ 
                color: '#8b4513', 
                marginBottom: '15px',
                fontSize: '1.5rem'
              }}>
                No Events Found
              </h3>
              <p style={{ 
                color: '#a0522d', 
                fontSize: '16px',
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                No events match your current filters. Try adjusting your selection or refresh the data to see all available events.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;