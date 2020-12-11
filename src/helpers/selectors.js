export function getAppointmentsForDay(state, day) {
  //const dailyAppointmentsId = [];
  //let result = [];
  
  //get dayObj by dayFound
  const dayFound = state.days.find( currentDay => currentDay.name === day);
  /*using for loop to find dayObj
  for (let dayObj of state.days) {
    if (dayObj.name === day) {
      dailyAppointmentsId.push(...dayObj.appointments);
    }
  }
  */
  //if not dayFound => []
  if(!dayFound) {
    return [];
  }
  /*
  for(let id of dailyAppointmentsId) {
    result.push(state.appointments[id]);
  }
  */
  //get the appointent obj for that day obj
  const appointments = dayFound.appointments.map( appointmentId => state.appointments[appointmentId])
  return appointments;
}

export function getInterview(state, interview) {
  let result = {};
  const interviewerId = [];
  if (!interview) {
    result = null;
  } else {
    for (let interviewer in state.interviewers) {
      interviewerId.push(interviewer);
  }
  for (let id of interviewerId) {
    if (Number(id) === interview.interviewer) {
      result.student = interview.student;
      result.interviewer = state.interviewers[interview.interviewer];
    }
  }
  }
  return result;
}