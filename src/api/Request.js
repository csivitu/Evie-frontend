import axios from "axios";
import API, { BASEURL } from "./Api";

export const getMonth = async (finalDate) => {
  let res = await API.post("/api/month", { begin: finalDate[0], end: finalDate[1] });
  return res.data;
};

export const getEvents = async () => {
  if (localStorage.getItem('jwtToken')) {
    let res = await API.get('/admin/events', { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })
    return (res.data)
  }
  else {
    let res = {};
    res.data = null;
  }
};

export const getCalendar = async () => {
  let res = await API.get('/api/calendar')
  return (res.data)
};

export const getDate = async (currentDate) => {
  let res = await API.post("/api/date", { date: currentDate })
  return res.data;
}

export const getToken = async (uname, password) => {
  try {
    const res = await axios({
      url: `${BASEURL}/admin/login`,
      method: "post",
      data: { uname, password },
    }
    );
    localStorage.setItem('jwtToken', res.data);
    return res.data;
  } catch (err) {
    console.error("this isthe error",err);
    return
  }
}

export const postEvent= async(form)=>{
  let res = await API.post("/api/add",form)
  return res.data;
}

export const approveEvent = async (id) =>{
  let res = await API.post(`/admin/approve`,{id}, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })
  return res.data;
}

export const denyEvent = async (id,reason) =>{
  let res = await API.post(`/admin/deny`,{id,reason}, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })
  return res.data;
}
export const removeEvent = async (id) =>{
  let res = await API.post(`/admin/remove`,{id}, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })
  return res.data;
}