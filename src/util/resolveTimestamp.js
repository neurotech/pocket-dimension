const { DateTime } = require("luxon");

const resolveTimestamp = (time) => {
  let now = DateTime.fromISO(time);
  let tz = now.zoneName;
  let offset = now.setZone(tz);
  return offset.toFormat("'Posted on' EEEE dd MMMM yyyy 'at' t");
};

export default resolveTimestamp;
