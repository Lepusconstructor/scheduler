export function getAppointmentsForDay(state, day) {
  const dailyAppointmentsId = [];
  let result = [];

  if(!day) {
    return result;
  }

  for (let dayObj of state.days) {
    if (dayObj.name === day) {
      dailyAppointmentsId.push(...dayObj.appointments);
    }
  }
  for(let id of dailyAppointmentsId) {
    result.push(state.appointments[id]);
  }
  
  return result;
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