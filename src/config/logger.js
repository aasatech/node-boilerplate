import {createStream} from "rotating-file-stream";

const logger = createStream("./logs/access.log", {
  size: '10M',
  interval: '1d',
  compress: 'gzip'
})

export default logger;

