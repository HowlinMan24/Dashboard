import {createLogger, format, transports} from "winston";
import morgan from "morgan";


const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({timestamp, level, message}) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console()
    ]
});

export const httpLogger = morgan((tokens, req, res) => {
   const logMessage = [
       `[${tokens.method(req,res)}]`,
       tokens.url(req,res),
       tokens.status(req,res),
       `- ${tokens[`response-time`](req,res)} ms`
   ].join(' ');

   const status = Number(tokens.status(req,res));
   if(status >= 400) {
       logger.error(logMessage);
   }else {
       logger.info(logMessage);
   }

   return logMessage;
}, {
    stream: {
        write: (message) => logger.info(message.trim())
    }
});

export default logger;