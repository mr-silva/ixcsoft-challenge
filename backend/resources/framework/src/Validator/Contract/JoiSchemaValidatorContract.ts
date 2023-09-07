import { Schema, isError } from 'joi'
import { ErrorDetail, InvalidDataException } from '../../Domain'

export class JoiSchemaValidatorContract {
  /**
   * Valida um payload com base em um Schema.
   *
   * @template T
   *
   * @param {T} body
   * @param {Schema} schema
   */
  protected async validateBySchema<T>(body: T, schema: Schema): Promise<void> {
    try {
      await schema.validateAsync(body, { abortEarly: false })
    } catch (e) {
      if (isError(e)) {
        throw new InvalidDataException(
          'Invalid data.',
          e.details.map(
            detail =>
              new ErrorDetail(
                `${detail.path.length ? `${detail.path.join('.')}.` : ''}${detail.type}`,
                detail.message,
                detail.context?.valids || []
              )
          )
        )
      }

      throw e
    }
  }
}
