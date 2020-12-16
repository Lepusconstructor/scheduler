export function getAppointmentsForDay(state, day) {
  //get dayObj by dayFound
  const dayFound = state.days.find((currentDay) => currentDay.name === day);
  //if not dayFound => []
  if (!dayFound) {
    return [];
  }
  //get the appointent obj for that day obj
  const appointments = dayFound.appointments.map(
    (appointmentId) => state.appointments[appointmentId]
  );
  return appointments;
}

//looks up interviewer obj by id to get interview result
export function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  } 
  
  let result = {};
  const interviewerIds = Object.keys(state.interviewers).map( id => Number(id) );
  
  for (let id of interviewerIds) {
    if (id === interview.interviewer) {
      result.student = interview.student;
      result.interviewer = state.interviewers[id];
    }
  }
  
 
  return result;
}

export function getInterviewersForDay(state, day) {
  //get day obj
  const dayFound = state.days.find((currentDay) => currentDay.name === day);
  //if not dayFound => []
  if (!dayFound) {
    return [];
  }
  //get interviewer obj for day obj
  const interviewers = dayFound.interviewers.map(
    (interviewerId) => state.interviewers[interviewerId]
  );
  return interviewers;
}

export function getSpotsForDay(state, dayName) {
  const day = state.days.find((day) => day.name === dayName);

  const spots = day.appointments.reduce((accu, appointmentId) => {
    return (accu += state.appointments[appointmentId].interview ? 0 : 1);
  }, 0);
  return spots;
}
