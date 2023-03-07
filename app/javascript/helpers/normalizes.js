export function normalizeName(firstName, lastName) {
  let fName = firstName.split(' ')[0];
  let lName = lastName.split(' ')[0];
  return fName + " " + lName;
}

function addHoursToDate(objDate, intHours) {
  var numberOfMlSeconds = objDate.getTime();
  var addMlSeconds = (intHours * 60) * 60000;
  var newDateObj = new Date(numberOfMlSeconds - addMlSeconds);

  return newDateObj;
}

export function normalizeDate(date) {
  const aux = new Date(date)
  var numberOfMlSeconds = aux.getTime();
  // var addMlSeconds = 60 * 60000 * 24;
  var newDateObj = new Date(numberOfMlSeconds);
  var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return newDateObj.toLocaleDateString('es-ES', options);
}

export function normalizeDateWithHour(date) {
  const aux = new Date(date)
  var options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return aux.toLocaleDateString('es-ES', options);
}

export function normalizeDocument(document_type) {
  if (document_type === 'dni') {
    return 'D.N.I'
  } else if (document_type === 'foreigner_card') {
    return 'Carnet de Extranjería'
  } else if (document_type === 'passport') {
    return 'Pasaporte'
  }
}

export function normalizeStatus(status) {
  if (status === 'on_hold') {
    return 'En espera';
  } else if (status === 'active') {
    return 'Matriculado';
  } else if (status === 'inactive') {
    return 'No activo';
  }else if (status === 'slow_payer') {
    return 'Con deuda';
  }
}

export const normalizeAndCalculateTwoDates = (_start, _end) => {
  const start = new Date(_start)
  const end = new Date(_end)
  const diff = end.getTime() - start.getTime()
  const days = parseInt((end - start) / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24
  const minutes = Math.floor(diff / (1000 * 60)) % 60
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`
  }else if (hours > 0) {
    return `${hours}h ${minutes}m`
  }else if (minutes > 0) {
    return `${minutes}m`
  }
}