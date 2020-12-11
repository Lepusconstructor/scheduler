export function getAppointmentsForDay(state, day) {
  //get dayObj by dayFound
  const dayFound = state.days.find( currentDay => currentDay.name === day);
  //if not dayFound => []
  if(!dayFound) {
    return [];
  }
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

export function getInterviewersForDay(state, day) {
  //get day obj
  const dayFound = state.days.find(currentDay => currentDay.name === day);
  //if not dayFound => []
  if(!dayFound) {
    return [];
  }
  //get interviewer obj for day obj
  const interviewers = dayFound.interviewers.map(interviewerId => state.interviewers[interviewerId]);
  return interviewers;
}