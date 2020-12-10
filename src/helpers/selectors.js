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
  console.log(result);
  return result;
}