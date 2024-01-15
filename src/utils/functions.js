export const groupHours = (hours) => {
  let groups = [];
  let currentGroup = [hours[0]];
  if (hours.length === 24) return "open 24 hours a day";

  for (let i = 1; i < hours.length; i++) {
    if (
      parseInt(hours[i]) ===
      parseInt(currentGroup[currentGroup.length - 1]) + 1
    ) {
      currentGroup.push(hours[i]);
    } else {
      groups.push(currentGroup);
      currentGroup = [hours[i]];
    }
  }

  groups.push(currentGroup);

  let resultado = groups.map(
    (group) => `open from ${group[0]} to ${group[group.length - 1]}`
  );

  return resultado.join(" and ");
};

export const groupDays = (days) => {
  const daysOfTheWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let groups = [];
  let currentGroup = [days[0]];

  for (let i = 1; i < days.length; i++) {
    // Si el día actual es consecutivo al último día del grupo actual, o si es domingo y el último día fue sábado
    if (
      daysOfTheWeek.indexOf(days[i]) ===
        (daysOfTheWeek.indexOf(currentGroup[currentGroup.length - 1]) + 1) %
          7 ||
      (days[i] === "sunday" &&
        currentGroup[currentGroup.length - 1] === "saturday")
    ) {
      currentGroup.push(days[i]);
    } else {
      // Si no, añade el grupo actual a los groups y comienza un nuevo grupo
      groups.push(currentGroup);
      currentGroup = [days[i]];
    }
  }

  // Añade el último grupo a los groups
  groups.push(currentGroup);

  // Convierte los groups en strings
  let resultado = groups.map((grupo) => {
    if (grupo.length === 2) {
      return `${grupo[0]} and ${grupo[1]}`;
    } else {
      return `from ${grupo[0]} to ${grupo[grupo.length - 1]}`;
    }
  });

  return resultado.join(" and ");
};

export const getShiftsByDuration = (duration, timesArr, setTimes) => {
  if (duration === 1) {
    return setTimes(timesArr);
  }

  let result = [];
  let temp = [];

  for (let i = 0; i < timesArr.length; i++) {
    if (
      temp.length < duration &&
      (i === 0 || Number(timesArr[i]) - Number(timesArr[i - 1]) === 1)
    ) {
      temp.push(timesArr[i]);
    } else {
      if (temp.length === duration) {
        result.push(temp[0]);
      }
      temp = [timesArr[i]];
    }
  }

  if (temp.length === duration) {
    result.push(temp[0]);
  }

  return setTimes(result);
};
