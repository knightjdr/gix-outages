import * as fs from 'fs';

interface OutageDate {
  day: number;
  month: number;
  year: number;
  time: string;
}
interface Outage {
  start: Date;
  end: Date;
  message: string;
}

const start: OutageDate = {
  day: 14,
  month: 2,
  year: 2022,
  time: '09:00',
};
const end: OutageDate = {
  day: 14,
  month: 2,
  year: 2022,
  time: '17:00',
};
const outageReason = 'maintenance at our cloud provider';

// Given a day, month, year and time (formatted as HH:MM), return the time in seconds since the epoch.
// Both the day and month are indexed from 1. Time should be in 24 hour format.
const getDateAsEST = (date: OutageDate) => {
  const [hour, minute] = date.time.split(':');
  return new Date(
    date.year,
    date.month - 1,
    date.day,
    Number(hour),
    Number(minute),
    0,
    0,
  );
};

const writeJSON = (obj: Outage, filename: string) => {
  const json = JSON.stringify(obj, null, 2);
  fs.writeFileSync(filename, json);
};

const outage: Outage = {
  start: getDateAsEST(start),
  end: getDateAsEST(end),
  message: outageReason,
};

writeJSON(outage, 'outages.json');

