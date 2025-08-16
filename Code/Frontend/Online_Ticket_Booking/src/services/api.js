import axios from 'axios'

// const BASE_URL = 'http://localhost:8080/user' 

const BASE = "http://localhost:8080";

// Fetch shows for a specific theater owner
export const fetchOwnerShows = async () => {
  try {
    const token = localStorage.getItem("token")
    const response = await axios.get(`${BASE}/user/shows/manage/`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching shows:", error)
    throw new Error("Failed to fetch shows")
  }
}

// Delete a show by ID
export const deleteShow = async (showId) => {
  try {
    const token = localStorage.getItem("token")
    const response = await axios.delete(`${BASE}/user/${showId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    return { success: true, message: response.data }
  } catch (error) {
    console.error("Error deleting show:", error)
    throw new Error("Failed to delete show")
  }
}

// Toggle show status (ACTIVE / SCHEDULED)
export const toggleShowStatus = async (showId, newStatus) => {
  try {
    const token = localStorage.getItem("token")
    const url = `${BASE}/user/${showId}/${newStatus === "ACTIVE" ? "activate" : "deactivate"}`
    const response = await axios.put(url,null,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
    return { success: true, message: response.data }
  } catch (error) {
    console.error(`Error toggling show status:`, error)
    throw new Error(`Failed to change show status`)
  }
}

// Fetch dashboard statistics for a specific theater owner
export const fetchDashboardStats = async () => {
  try {
    const token = localStorage.getItem("token")
    const response = await axios.get(`${BASE}/user/dashboard/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    throw new Error("Failed to load dashboard statistics")
  }
}

export const fetchMoviesForShows = async () => {
  const { data } = await axios.get(`${BASE}/user/movies/shows`);
  return data;
};

export const fetchTheaterById = async (theaterId) => {
  const { data } = await axios.get(`${BASE}/api/theaters/${theaterId}`);
  return data;
};

export const fetchLayoutByTheaterId = async (theaterId) => {
  const { data } = await axios.get(`${BASE}/api/theaters/${theaterId}/getlayout`);
  return data;
};


export const addShow = async (theaterId, showData) => {
  const payload = {
    movieId: showData.movieId,
    screenId: showData.screenId,
    showDate: showData.showDate,
    showTime: showData.showTime,
    seatPrices: showData.seatPrices,
  };
  const token = localStorage.getItem("token")
  const { data } = await axios.post(`${BASE}/shows/theaters/${theaterId}`, payload,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  return data;
};


export const addLayout = async (theaterId, layoutRequestDTO) => {
  const token = localStorage.getItem("token")
  const { data } = await axios.post(`${BASE}/api/theaters/${theaterId}/savelayout`, layoutRequestDTO, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
  return data;
};

