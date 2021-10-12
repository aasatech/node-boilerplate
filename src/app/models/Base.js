import {Model} from "objection";
import difference from 'lodash.difference';

class CustomQueryBuilder extends Model.QueryBuilder {
  visible (...visible) {
    this.context({ visible })

    return this
  }
}

export default class Base extends Model {
  static get QueryBuilder () {
    return CustomQueryBuilder
  }

  static get hidden () {
    return []
  }

  $afterFind (queryContext) {
    const { hidden } = this.constructor
    const { visible } = queryContext

    if (hidden.length > 0) {
      const unset = difference(hidden, visible)

      for (const property of unset) {
        delete this[property]
      }
    }
  }
}
