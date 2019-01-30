import { guard, mixed, object, string } from 'decoders';
import { LabeledMsg } from './LabeledMsg';
import { createMessageValidator } from './validationUtils';

/**
 * Client started indication.  The client will
 * now listen for messages and begin sending
 * messages from the client application.
 * @external
 */
export interface LabeledStarted extends LabeledMsg {
  msgType: 'client_started';
}

// We don't care what is in msg for Started messages.
/** @external */
const startedDecoder = guard(mixed);

/** @external */
const validateStarted = createMessageValidator<LabeledStarted>(
  'client_started',
  startedDecoder
);

/**
 * Environmental data provided to all clients
 * in order to match behavior of the host application.
 */
export interface EnvData {
  locale: string;
  hostRootUrl: string;
  custom?: any;
}

/**
 * Initial setup message where environmental data
 * is sent to the client.
 * @external
 */
export interface LabeledEnvInit extends LabeledMsg {
  msgType: 'env_init';
  msg: EnvData;
}

/** @external */
const envDataDecoder = guard(
  object({
    locale: string,
    hostRootUrl: string,
    custom: mixed
  })
);

/** @external */
const validateEnvData = createMessageValidator<LabeledEnvInit>(
  'env_init',
  envDataDecoder
);

export { validateStarted, validateEnvData };

/**
 * Handles new environmental data events.
 */
export type EnvDataHandler = (envData: EnvData) => void;

/**
 * Helpful properties for working with lifecycle stages and
 * their coresponding labeled messages.
 * @external
 */
export class Lifecycle {
  /**
   * A {@link LabeledStarted} message to send to the host application.
   */
  public static get startedMessage(): LabeledStarted {
    return {
      msgType: 'client_started',
      msg: undefined
    };
  }
}