
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Church
 * 
 */
export type Church = $Result.DefaultSelection<Prisma.$ChurchPayload>
/**
 * Model FinancialEntry
 * 
 */
export type FinancialEntry = $Result.DefaultSelection<Prisma.$FinancialEntryPayload>
/**
 * Model ChurchLink
 * 
 */
export type ChurchLink = $Result.DefaultSelection<Prisma.$ChurchLinkPayload>
/**
 * Model WeeklySchedule
 * 
 */
export type WeeklySchedule = $Result.DefaultSelection<Prisma.$WeeklySchedulePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Person
 * 
 */
export type Person = $Result.DefaultSelection<Prisma.$PersonPayload>
/**
 * Model Ministry
 * 
 */
export type Ministry = $Result.DefaultSelection<Prisma.$MinistryPayload>
/**
 * Model VolunteerScale
 * 
 */
export type VolunteerScale = $Result.DefaultSelection<Prisma.$VolunteerScalePayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const SystemRole: {
  ADMIN: 'ADMIN',
  USER: 'USER',
  GUEST: 'GUEST'
};

export type SystemRole = (typeof SystemRole)[keyof typeof SystemRole]


export const TypePerson: {
  STAFF: 'STAFF',
  MEMBER: 'MEMBER',
  VISITOR: 'VISITOR',
  VOLUNTEER: 'VOLUNTEER'
};

export type TypePerson = (typeof TypePerson)[keyof typeof TypePerson]


export const DayOfWeek: {
  DOMINGO: 'DOMINGO',
  SEGUNDA: 'SEGUNDA',
  TERCA: 'TERCA',
  QUARTA: 'QUARTA',
  QUINTA: 'QUINTA',
  SEXTA: 'SEXTA',
  SABADO: 'SABADO'
};

export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek]


export const EntryType: {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE'
};

export type EntryType = (typeof EntryType)[keyof typeof EntryType]

}

export type SystemRole = $Enums.SystemRole

export const SystemRole: typeof $Enums.SystemRole

export type TypePerson = $Enums.TypePerson

export const TypePerson: typeof $Enums.TypePerson

export type DayOfWeek = $Enums.DayOfWeek

export const DayOfWeek: typeof $Enums.DayOfWeek

export type EntryType = $Enums.EntryType

export const EntryType: typeof $Enums.EntryType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Churches
 * const churches = await prisma.church.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Churches
   * const churches = await prisma.church.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.church`: Exposes CRUD operations for the **Church** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Churches
    * const churches = await prisma.church.findMany()
    * ```
    */
  get church(): Prisma.ChurchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.financialEntry`: Exposes CRUD operations for the **FinancialEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FinancialEntries
    * const financialEntries = await prisma.financialEntry.findMany()
    * ```
    */
  get financialEntry(): Prisma.FinancialEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.churchLink`: Exposes CRUD operations for the **ChurchLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChurchLinks
    * const churchLinks = await prisma.churchLink.findMany()
    * ```
    */
  get churchLink(): Prisma.ChurchLinkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.weeklySchedule`: Exposes CRUD operations for the **WeeklySchedule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WeeklySchedules
    * const weeklySchedules = await prisma.weeklySchedule.findMany()
    * ```
    */
  get weeklySchedule(): Prisma.WeeklyScheduleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.person`: Exposes CRUD operations for the **Person** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more People
    * const people = await prisma.person.findMany()
    * ```
    */
  get person(): Prisma.PersonDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ministry`: Exposes CRUD operations for the **Ministry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ministries
    * const ministries = await prisma.ministry.findMany()
    * ```
    */
  get ministry(): Prisma.MinistryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.volunteerScale`: Exposes CRUD operations for the **VolunteerScale** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VolunteerScales
    * const volunteerScales = await prisma.volunteerScale.findMany()
    * ```
    */
  get volunteerScale(): Prisma.VolunteerScaleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.2
   * Query Engine version: 94a226be1cf2967af2541cca5529f0f7ba866919
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Church: 'Church',
    FinancialEntry: 'FinancialEntry',
    ChurchLink: 'ChurchLink',
    WeeklySchedule: 'WeeklySchedule',
    User: 'User',
    Person: 'Person',
    Ministry: 'Ministry',
    VolunteerScale: 'VolunteerScale',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "church" | "financialEntry" | "churchLink" | "weeklySchedule" | "user" | "person" | "ministry" | "volunteerScale" | "session" | "account" | "verification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Church: {
        payload: Prisma.$ChurchPayload<ExtArgs>
        fields: Prisma.ChurchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChurchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChurchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload>
          }
          findFirst: {
            args: Prisma.ChurchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChurchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload>
          }
          findMany: {
            args: Prisma.ChurchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload>[]
          }
          create: {
            args: Prisma.ChurchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload>
          }
          createMany: {
            args: Prisma.ChurchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChurchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload>[]
          }
          delete: {
            args: Prisma.ChurchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload>
          }
          update: {
            args: Prisma.ChurchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload>
          }
          deleteMany: {
            args: Prisma.ChurchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChurchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChurchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload>[]
          }
          upsert: {
            args: Prisma.ChurchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchPayload>
          }
          aggregate: {
            args: Prisma.ChurchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChurch>
          }
          groupBy: {
            args: Prisma.ChurchGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChurchGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChurchCountArgs<ExtArgs>
            result: $Utils.Optional<ChurchCountAggregateOutputType> | number
          }
        }
      }
      FinancialEntry: {
        payload: Prisma.$FinancialEntryPayload<ExtArgs>
        fields: Prisma.FinancialEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FinancialEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FinancialEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialEntryPayload>
          }
          findFirst: {
            args: Prisma.FinancialEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FinancialEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialEntryPayload>
          }
          findMany: {
            args: Prisma.FinancialEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialEntryPayload>[]
          }
          create: {
            args: Prisma.FinancialEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialEntryPayload>
          }
          createMany: {
            args: Prisma.FinancialEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FinancialEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialEntryPayload>[]
          }
          delete: {
            args: Prisma.FinancialEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialEntryPayload>
          }
          update: {
            args: Prisma.FinancialEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialEntryPayload>
          }
          deleteMany: {
            args: Prisma.FinancialEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FinancialEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FinancialEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialEntryPayload>[]
          }
          upsert: {
            args: Prisma.FinancialEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialEntryPayload>
          }
          aggregate: {
            args: Prisma.FinancialEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFinancialEntry>
          }
          groupBy: {
            args: Prisma.FinancialEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<FinancialEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.FinancialEntryCountArgs<ExtArgs>
            result: $Utils.Optional<FinancialEntryCountAggregateOutputType> | number
          }
        }
      }
      ChurchLink: {
        payload: Prisma.$ChurchLinkPayload<ExtArgs>
        fields: Prisma.ChurchLinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChurchLinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchLinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChurchLinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchLinkPayload>
          }
          findFirst: {
            args: Prisma.ChurchLinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchLinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChurchLinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchLinkPayload>
          }
          findMany: {
            args: Prisma.ChurchLinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchLinkPayload>[]
          }
          create: {
            args: Prisma.ChurchLinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchLinkPayload>
          }
          createMany: {
            args: Prisma.ChurchLinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChurchLinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchLinkPayload>[]
          }
          delete: {
            args: Prisma.ChurchLinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchLinkPayload>
          }
          update: {
            args: Prisma.ChurchLinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchLinkPayload>
          }
          deleteMany: {
            args: Prisma.ChurchLinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChurchLinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChurchLinkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchLinkPayload>[]
          }
          upsert: {
            args: Prisma.ChurchLinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChurchLinkPayload>
          }
          aggregate: {
            args: Prisma.ChurchLinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChurchLink>
          }
          groupBy: {
            args: Prisma.ChurchLinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChurchLinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChurchLinkCountArgs<ExtArgs>
            result: $Utils.Optional<ChurchLinkCountAggregateOutputType> | number
          }
        }
      }
      WeeklySchedule: {
        payload: Prisma.$WeeklySchedulePayload<ExtArgs>
        fields: Prisma.WeeklyScheduleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WeeklyScheduleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklySchedulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WeeklyScheduleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklySchedulePayload>
          }
          findFirst: {
            args: Prisma.WeeklyScheduleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklySchedulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WeeklyScheduleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklySchedulePayload>
          }
          findMany: {
            args: Prisma.WeeklyScheduleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklySchedulePayload>[]
          }
          create: {
            args: Prisma.WeeklyScheduleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklySchedulePayload>
          }
          createMany: {
            args: Prisma.WeeklyScheduleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WeeklyScheduleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklySchedulePayload>[]
          }
          delete: {
            args: Prisma.WeeklyScheduleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklySchedulePayload>
          }
          update: {
            args: Prisma.WeeklyScheduleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklySchedulePayload>
          }
          deleteMany: {
            args: Prisma.WeeklyScheduleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WeeklyScheduleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WeeklyScheduleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklySchedulePayload>[]
          }
          upsert: {
            args: Prisma.WeeklyScheduleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklySchedulePayload>
          }
          aggregate: {
            args: Prisma.WeeklyScheduleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWeeklySchedule>
          }
          groupBy: {
            args: Prisma.WeeklyScheduleGroupByArgs<ExtArgs>
            result: $Utils.Optional<WeeklyScheduleGroupByOutputType>[]
          }
          count: {
            args: Prisma.WeeklyScheduleCountArgs<ExtArgs>
            result: $Utils.Optional<WeeklyScheduleCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Person: {
        payload: Prisma.$PersonPayload<ExtArgs>
        fields: Prisma.PersonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PersonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PersonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          findFirst: {
            args: Prisma.PersonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PersonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          findMany: {
            args: Prisma.PersonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>[]
          }
          create: {
            args: Prisma.PersonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          createMany: {
            args: Prisma.PersonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PersonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>[]
          }
          delete: {
            args: Prisma.PersonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          update: {
            args: Prisma.PersonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          deleteMany: {
            args: Prisma.PersonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PersonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PersonUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>[]
          }
          upsert: {
            args: Prisma.PersonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          aggregate: {
            args: Prisma.PersonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePerson>
          }
          groupBy: {
            args: Prisma.PersonGroupByArgs<ExtArgs>
            result: $Utils.Optional<PersonGroupByOutputType>[]
          }
          count: {
            args: Prisma.PersonCountArgs<ExtArgs>
            result: $Utils.Optional<PersonCountAggregateOutputType> | number
          }
        }
      }
      Ministry: {
        payload: Prisma.$MinistryPayload<ExtArgs>
        fields: Prisma.MinistryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MinistryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinistryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MinistryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinistryPayload>
          }
          findFirst: {
            args: Prisma.MinistryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinistryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MinistryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinistryPayload>
          }
          findMany: {
            args: Prisma.MinistryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinistryPayload>[]
          }
          create: {
            args: Prisma.MinistryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinistryPayload>
          }
          createMany: {
            args: Prisma.MinistryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MinistryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinistryPayload>[]
          }
          delete: {
            args: Prisma.MinistryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinistryPayload>
          }
          update: {
            args: Prisma.MinistryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinistryPayload>
          }
          deleteMany: {
            args: Prisma.MinistryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MinistryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MinistryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinistryPayload>[]
          }
          upsert: {
            args: Prisma.MinistryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinistryPayload>
          }
          aggregate: {
            args: Prisma.MinistryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMinistry>
          }
          groupBy: {
            args: Prisma.MinistryGroupByArgs<ExtArgs>
            result: $Utils.Optional<MinistryGroupByOutputType>[]
          }
          count: {
            args: Prisma.MinistryCountArgs<ExtArgs>
            result: $Utils.Optional<MinistryCountAggregateOutputType> | number
          }
        }
      }
      VolunteerScale: {
        payload: Prisma.$VolunteerScalePayload<ExtArgs>
        fields: Prisma.VolunteerScaleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VolunteerScaleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerScalePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VolunteerScaleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerScalePayload>
          }
          findFirst: {
            args: Prisma.VolunteerScaleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerScalePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VolunteerScaleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerScalePayload>
          }
          findMany: {
            args: Prisma.VolunteerScaleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerScalePayload>[]
          }
          create: {
            args: Prisma.VolunteerScaleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerScalePayload>
          }
          createMany: {
            args: Prisma.VolunteerScaleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VolunteerScaleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerScalePayload>[]
          }
          delete: {
            args: Prisma.VolunteerScaleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerScalePayload>
          }
          update: {
            args: Prisma.VolunteerScaleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerScalePayload>
          }
          deleteMany: {
            args: Prisma.VolunteerScaleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VolunteerScaleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VolunteerScaleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerScalePayload>[]
          }
          upsert: {
            args: Prisma.VolunteerScaleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerScalePayload>
          }
          aggregate: {
            args: Prisma.VolunteerScaleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVolunteerScale>
          }
          groupBy: {
            args: Prisma.VolunteerScaleGroupByArgs<ExtArgs>
            result: $Utils.Optional<VolunteerScaleGroupByOutputType>[]
          }
          count: {
            args: Prisma.VolunteerScaleCountArgs<ExtArgs>
            result: $Utils.Optional<VolunteerScaleCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    church?: ChurchOmit
    financialEntry?: FinancialEntryOmit
    churchLink?: ChurchLinkOmit
    weeklySchedule?: WeeklyScheduleOmit
    user?: UserOmit
    person?: PersonOmit
    ministry?: MinistryOmit
    volunteerScale?: VolunteerScaleOmit
    session?: SessionOmit
    account?: AccountOmit
    verification?: VerificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ChurchCountOutputType
   */

  export type ChurchCountOutputType = {
    users: number
    persons: number
    links: number
    schedules: number
    ministries: number
    volunteerScales: number
    financialEntries: number
  }

  export type ChurchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | ChurchCountOutputTypeCountUsersArgs
    persons?: boolean | ChurchCountOutputTypeCountPersonsArgs
    links?: boolean | ChurchCountOutputTypeCountLinksArgs
    schedules?: boolean | ChurchCountOutputTypeCountSchedulesArgs
    ministries?: boolean | ChurchCountOutputTypeCountMinistriesArgs
    volunteerScales?: boolean | ChurchCountOutputTypeCountVolunteerScalesArgs
    financialEntries?: boolean | ChurchCountOutputTypeCountFinancialEntriesArgs
  }

  // Custom InputTypes
  /**
   * ChurchCountOutputType without action
   */
  export type ChurchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChurchCountOutputType
     */
    select?: ChurchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChurchCountOutputType without action
   */
  export type ChurchCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * ChurchCountOutputType without action
   */
  export type ChurchCountOutputTypeCountPersonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonWhereInput
  }

  /**
   * ChurchCountOutputType without action
   */
  export type ChurchCountOutputTypeCountLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChurchLinkWhereInput
  }

  /**
   * ChurchCountOutputType without action
   */
  export type ChurchCountOutputTypeCountSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeeklyScheduleWhereInput
  }

  /**
   * ChurchCountOutputType without action
   */
  export type ChurchCountOutputTypeCountMinistriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MinistryWhereInput
  }

  /**
   * ChurchCountOutputType without action
   */
  export type ChurchCountOutputTypeCountVolunteerScalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VolunteerScaleWhereInput
  }

  /**
   * ChurchCountOutputType without action
   */
  export type ChurchCountOutputTypeCountFinancialEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FinancialEntryWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    accounts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }


  /**
   * Count Type PersonCountOutputType
   */

  export type PersonCountOutputType = {
    volunteerScales: number
  }

  export type PersonCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    volunteerScales?: boolean | PersonCountOutputTypeCountVolunteerScalesArgs
  }

  // Custom InputTypes
  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonCountOutputType
     */
    select?: PersonCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountVolunteerScalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VolunteerScaleWhereInput
  }


  /**
   * Count Type MinistryCountOutputType
   */

  export type MinistryCountOutputType = {
    scales: number
  }

  export type MinistryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scales?: boolean | MinistryCountOutputTypeCountScalesArgs
  }

  // Custom InputTypes
  /**
   * MinistryCountOutputType without action
   */
  export type MinistryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MinistryCountOutputType
     */
    select?: MinistryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MinistryCountOutputType without action
   */
  export type MinistryCountOutputTypeCountScalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VolunteerScaleWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Church
   */

  export type AggregateChurch = {
    _count: ChurchCountAggregateOutputType | null
    _min: ChurchMinAggregateOutputType | null
    _max: ChurchMaxAggregateOutputType | null
  }

  export type ChurchMinAggregateOutputType = {
    id: string | null
    name: string | null
    label: string | null
    address: string | null
    pixKeyType: string | null
    pixKeyValue: string | null
    pixCopyPaste: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChurchMaxAggregateOutputType = {
    id: string | null
    name: string | null
    label: string | null
    address: string | null
    pixKeyType: string | null
    pixKeyValue: string | null
    pixCopyPaste: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChurchCountAggregateOutputType = {
    id: number
    name: number
    label: number
    address: number
    contact: number
    customization: number
    pixKeyType: number
    pixKeyValue: number
    pixCopyPaste: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChurchMinAggregateInputType = {
    id?: true
    name?: true
    label?: true
    address?: true
    pixKeyType?: true
    pixKeyValue?: true
    pixCopyPaste?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChurchMaxAggregateInputType = {
    id?: true
    name?: true
    label?: true
    address?: true
    pixKeyType?: true
    pixKeyValue?: true
    pixCopyPaste?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChurchCountAggregateInputType = {
    id?: true
    name?: true
    label?: true
    address?: true
    contact?: true
    customization?: true
    pixKeyType?: true
    pixKeyValue?: true
    pixCopyPaste?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChurchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Church to aggregate.
     */
    where?: ChurchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Churches to fetch.
     */
    orderBy?: ChurchOrderByWithRelationInput | ChurchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChurchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Churches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Churches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Churches
    **/
    _count?: true | ChurchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChurchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChurchMaxAggregateInputType
  }

  export type GetChurchAggregateType<T extends ChurchAggregateArgs> = {
        [P in keyof T & keyof AggregateChurch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChurch[P]>
      : GetScalarType<T[P], AggregateChurch[P]>
  }




  export type ChurchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChurchWhereInput
    orderBy?: ChurchOrderByWithAggregationInput | ChurchOrderByWithAggregationInput[]
    by: ChurchScalarFieldEnum[] | ChurchScalarFieldEnum
    having?: ChurchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChurchCountAggregateInputType | true
    _min?: ChurchMinAggregateInputType
    _max?: ChurchMaxAggregateInputType
  }

  export type ChurchGroupByOutputType = {
    id: string
    name: string
    label: string
    address: string
    contact: string[]
    customization: JsonValue | null
    pixKeyType: string | null
    pixKeyValue: string | null
    pixCopyPaste: string | null
    createdAt: Date
    updatedAt: Date
    _count: ChurchCountAggregateOutputType | null
    _min: ChurchMinAggregateOutputType | null
    _max: ChurchMaxAggregateOutputType | null
  }

  type GetChurchGroupByPayload<T extends ChurchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChurchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChurchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChurchGroupByOutputType[P]>
            : GetScalarType<T[P], ChurchGroupByOutputType[P]>
        }
      >
    >


  export type ChurchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    label?: boolean
    address?: boolean
    contact?: boolean
    customization?: boolean
    pixKeyType?: boolean
    pixKeyValue?: boolean
    pixCopyPaste?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Church$usersArgs<ExtArgs>
    persons?: boolean | Church$personsArgs<ExtArgs>
    links?: boolean | Church$linksArgs<ExtArgs>
    schedules?: boolean | Church$schedulesArgs<ExtArgs>
    ministries?: boolean | Church$ministriesArgs<ExtArgs>
    volunteerScales?: boolean | Church$volunteerScalesArgs<ExtArgs>
    financialEntries?: boolean | Church$financialEntriesArgs<ExtArgs>
    _count?: boolean | ChurchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["church"]>

  export type ChurchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    label?: boolean
    address?: boolean
    contact?: boolean
    customization?: boolean
    pixKeyType?: boolean
    pixKeyValue?: boolean
    pixCopyPaste?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["church"]>

  export type ChurchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    label?: boolean
    address?: boolean
    contact?: boolean
    customization?: boolean
    pixKeyType?: boolean
    pixKeyValue?: boolean
    pixCopyPaste?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["church"]>

  export type ChurchSelectScalar = {
    id?: boolean
    name?: boolean
    label?: boolean
    address?: boolean
    contact?: boolean
    customization?: boolean
    pixKeyType?: boolean
    pixKeyValue?: boolean
    pixCopyPaste?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ChurchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "label" | "address" | "contact" | "customization" | "pixKeyType" | "pixKeyValue" | "pixCopyPaste" | "createdAt" | "updatedAt", ExtArgs["result"]["church"]>
  export type ChurchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Church$usersArgs<ExtArgs>
    persons?: boolean | Church$personsArgs<ExtArgs>
    links?: boolean | Church$linksArgs<ExtArgs>
    schedules?: boolean | Church$schedulesArgs<ExtArgs>
    ministries?: boolean | Church$ministriesArgs<ExtArgs>
    volunteerScales?: boolean | Church$volunteerScalesArgs<ExtArgs>
    financialEntries?: boolean | Church$financialEntriesArgs<ExtArgs>
    _count?: boolean | ChurchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChurchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ChurchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ChurchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Church"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      persons: Prisma.$PersonPayload<ExtArgs>[]
      links: Prisma.$ChurchLinkPayload<ExtArgs>[]
      schedules: Prisma.$WeeklySchedulePayload<ExtArgs>[]
      ministries: Prisma.$MinistryPayload<ExtArgs>[]
      volunteerScales: Prisma.$VolunteerScalePayload<ExtArgs>[]
      financialEntries: Prisma.$FinancialEntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      label: string
      address: string
      contact: string[]
      customization: Prisma.JsonValue | null
      pixKeyType: string | null
      pixKeyValue: string | null
      pixCopyPaste: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["church"]>
    composites: {}
  }

  type ChurchGetPayload<S extends boolean | null | undefined | ChurchDefaultArgs> = $Result.GetResult<Prisma.$ChurchPayload, S>

  type ChurchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChurchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChurchCountAggregateInputType | true
    }

  export interface ChurchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Church'], meta: { name: 'Church' } }
    /**
     * Find zero or one Church that matches the filter.
     * @param {ChurchFindUniqueArgs} args - Arguments to find a Church
     * @example
     * // Get one Church
     * const church = await prisma.church.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChurchFindUniqueArgs>(args: SelectSubset<T, ChurchFindUniqueArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Church that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChurchFindUniqueOrThrowArgs} args - Arguments to find a Church
     * @example
     * // Get one Church
     * const church = await prisma.church.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChurchFindUniqueOrThrowArgs>(args: SelectSubset<T, ChurchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Church that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchFindFirstArgs} args - Arguments to find a Church
     * @example
     * // Get one Church
     * const church = await prisma.church.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChurchFindFirstArgs>(args?: SelectSubset<T, ChurchFindFirstArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Church that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchFindFirstOrThrowArgs} args - Arguments to find a Church
     * @example
     * // Get one Church
     * const church = await prisma.church.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChurchFindFirstOrThrowArgs>(args?: SelectSubset<T, ChurchFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Churches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Churches
     * const churches = await prisma.church.findMany()
     * 
     * // Get first 10 Churches
     * const churches = await prisma.church.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const churchWithIdOnly = await prisma.church.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChurchFindManyArgs>(args?: SelectSubset<T, ChurchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Church.
     * @param {ChurchCreateArgs} args - Arguments to create a Church.
     * @example
     * // Create one Church
     * const Church = await prisma.church.create({
     *   data: {
     *     // ... data to create a Church
     *   }
     * })
     * 
     */
    create<T extends ChurchCreateArgs>(args: SelectSubset<T, ChurchCreateArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Churches.
     * @param {ChurchCreateManyArgs} args - Arguments to create many Churches.
     * @example
     * // Create many Churches
     * const church = await prisma.church.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChurchCreateManyArgs>(args?: SelectSubset<T, ChurchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Churches and returns the data saved in the database.
     * @param {ChurchCreateManyAndReturnArgs} args - Arguments to create many Churches.
     * @example
     * // Create many Churches
     * const church = await prisma.church.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Churches and only return the `id`
     * const churchWithIdOnly = await prisma.church.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChurchCreateManyAndReturnArgs>(args?: SelectSubset<T, ChurchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Church.
     * @param {ChurchDeleteArgs} args - Arguments to delete one Church.
     * @example
     * // Delete one Church
     * const Church = await prisma.church.delete({
     *   where: {
     *     // ... filter to delete one Church
     *   }
     * })
     * 
     */
    delete<T extends ChurchDeleteArgs>(args: SelectSubset<T, ChurchDeleteArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Church.
     * @param {ChurchUpdateArgs} args - Arguments to update one Church.
     * @example
     * // Update one Church
     * const church = await prisma.church.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChurchUpdateArgs>(args: SelectSubset<T, ChurchUpdateArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Churches.
     * @param {ChurchDeleteManyArgs} args - Arguments to filter Churches to delete.
     * @example
     * // Delete a few Churches
     * const { count } = await prisma.church.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChurchDeleteManyArgs>(args?: SelectSubset<T, ChurchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Churches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Churches
     * const church = await prisma.church.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChurchUpdateManyArgs>(args: SelectSubset<T, ChurchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Churches and returns the data updated in the database.
     * @param {ChurchUpdateManyAndReturnArgs} args - Arguments to update many Churches.
     * @example
     * // Update many Churches
     * const church = await prisma.church.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Churches and only return the `id`
     * const churchWithIdOnly = await prisma.church.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChurchUpdateManyAndReturnArgs>(args: SelectSubset<T, ChurchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Church.
     * @param {ChurchUpsertArgs} args - Arguments to update or create a Church.
     * @example
     * // Update or create a Church
     * const church = await prisma.church.upsert({
     *   create: {
     *     // ... data to create a Church
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Church we want to update
     *   }
     * })
     */
    upsert<T extends ChurchUpsertArgs>(args: SelectSubset<T, ChurchUpsertArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Churches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchCountArgs} args - Arguments to filter Churches to count.
     * @example
     * // Count the number of Churches
     * const count = await prisma.church.count({
     *   where: {
     *     // ... the filter for the Churches we want to count
     *   }
     * })
    **/
    count<T extends ChurchCountArgs>(
      args?: Subset<T, ChurchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChurchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Church.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChurchAggregateArgs>(args: Subset<T, ChurchAggregateArgs>): Prisma.PrismaPromise<GetChurchAggregateType<T>>

    /**
     * Group by Church.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChurchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChurchGroupByArgs['orderBy'] }
        : { orderBy?: ChurchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChurchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChurchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Church model
   */
  readonly fields: ChurchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Church.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChurchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Church$usersArgs<ExtArgs> = {}>(args?: Subset<T, Church$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    persons<T extends Church$personsArgs<ExtArgs> = {}>(args?: Subset<T, Church$personsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    links<T extends Church$linksArgs<ExtArgs> = {}>(args?: Subset<T, Church$linksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChurchLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    schedules<T extends Church$schedulesArgs<ExtArgs> = {}>(args?: Subset<T, Church$schedulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklySchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ministries<T extends Church$ministriesArgs<ExtArgs> = {}>(args?: Subset<T, Church$ministriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MinistryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    volunteerScales<T extends Church$volunteerScalesArgs<ExtArgs> = {}>(args?: Subset<T, Church$volunteerScalesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VolunteerScalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    financialEntries<T extends Church$financialEntriesArgs<ExtArgs> = {}>(args?: Subset<T, Church$financialEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinancialEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Church model
   */
  interface ChurchFieldRefs {
    readonly id: FieldRef<"Church", 'String'>
    readonly name: FieldRef<"Church", 'String'>
    readonly label: FieldRef<"Church", 'String'>
    readonly address: FieldRef<"Church", 'String'>
    readonly contact: FieldRef<"Church", 'String[]'>
    readonly customization: FieldRef<"Church", 'Json'>
    readonly pixKeyType: FieldRef<"Church", 'String'>
    readonly pixKeyValue: FieldRef<"Church", 'String'>
    readonly pixCopyPaste: FieldRef<"Church", 'String'>
    readonly createdAt: FieldRef<"Church", 'DateTime'>
    readonly updatedAt: FieldRef<"Church", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Church findUnique
   */
  export type ChurchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    /**
     * Filter, which Church to fetch.
     */
    where: ChurchWhereUniqueInput
  }

  /**
   * Church findUniqueOrThrow
   */
  export type ChurchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    /**
     * Filter, which Church to fetch.
     */
    where: ChurchWhereUniqueInput
  }

  /**
   * Church findFirst
   */
  export type ChurchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    /**
     * Filter, which Church to fetch.
     */
    where?: ChurchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Churches to fetch.
     */
    orderBy?: ChurchOrderByWithRelationInput | ChurchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Churches.
     */
    cursor?: ChurchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Churches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Churches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Churches.
     */
    distinct?: ChurchScalarFieldEnum | ChurchScalarFieldEnum[]
  }

  /**
   * Church findFirstOrThrow
   */
  export type ChurchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    /**
     * Filter, which Church to fetch.
     */
    where?: ChurchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Churches to fetch.
     */
    orderBy?: ChurchOrderByWithRelationInput | ChurchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Churches.
     */
    cursor?: ChurchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Churches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Churches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Churches.
     */
    distinct?: ChurchScalarFieldEnum | ChurchScalarFieldEnum[]
  }

  /**
   * Church findMany
   */
  export type ChurchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    /**
     * Filter, which Churches to fetch.
     */
    where?: ChurchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Churches to fetch.
     */
    orderBy?: ChurchOrderByWithRelationInput | ChurchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Churches.
     */
    cursor?: ChurchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Churches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Churches.
     */
    skip?: number
    distinct?: ChurchScalarFieldEnum | ChurchScalarFieldEnum[]
  }

  /**
   * Church create
   */
  export type ChurchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    /**
     * The data needed to create a Church.
     */
    data: XOR<ChurchCreateInput, ChurchUncheckedCreateInput>
  }

  /**
   * Church createMany
   */
  export type ChurchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Churches.
     */
    data: ChurchCreateManyInput | ChurchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Church createManyAndReturn
   */
  export type ChurchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * The data used to create many Churches.
     */
    data: ChurchCreateManyInput | ChurchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Church update
   */
  export type ChurchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    /**
     * The data needed to update a Church.
     */
    data: XOR<ChurchUpdateInput, ChurchUncheckedUpdateInput>
    /**
     * Choose, which Church to update.
     */
    where: ChurchWhereUniqueInput
  }

  /**
   * Church updateMany
   */
  export type ChurchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Churches.
     */
    data: XOR<ChurchUpdateManyMutationInput, ChurchUncheckedUpdateManyInput>
    /**
     * Filter which Churches to update
     */
    where?: ChurchWhereInput
    /**
     * Limit how many Churches to update.
     */
    limit?: number
  }

  /**
   * Church updateManyAndReturn
   */
  export type ChurchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * The data used to update Churches.
     */
    data: XOR<ChurchUpdateManyMutationInput, ChurchUncheckedUpdateManyInput>
    /**
     * Filter which Churches to update
     */
    where?: ChurchWhereInput
    /**
     * Limit how many Churches to update.
     */
    limit?: number
  }

  /**
   * Church upsert
   */
  export type ChurchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    /**
     * The filter to search for the Church to update in case it exists.
     */
    where: ChurchWhereUniqueInput
    /**
     * In case the Church found by the `where` argument doesn't exist, create a new Church with this data.
     */
    create: XOR<ChurchCreateInput, ChurchUncheckedCreateInput>
    /**
     * In case the Church was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChurchUpdateInput, ChurchUncheckedUpdateInput>
  }

  /**
   * Church delete
   */
  export type ChurchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    /**
     * Filter which Church to delete.
     */
    where: ChurchWhereUniqueInput
  }

  /**
   * Church deleteMany
   */
  export type ChurchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Churches to delete
     */
    where?: ChurchWhereInput
    /**
     * Limit how many Churches to delete.
     */
    limit?: number
  }

  /**
   * Church.users
   */
  export type Church$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Church.persons
   */
  export type Church$personsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    where?: PersonWhereInput
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    cursor?: PersonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Church.links
   */
  export type Church$linksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChurchLink
     */
    select?: ChurchLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChurchLink
     */
    omit?: ChurchLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchLinkInclude<ExtArgs> | null
    where?: ChurchLinkWhereInput
    orderBy?: ChurchLinkOrderByWithRelationInput | ChurchLinkOrderByWithRelationInput[]
    cursor?: ChurchLinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChurchLinkScalarFieldEnum | ChurchLinkScalarFieldEnum[]
  }

  /**
   * Church.schedules
   */
  export type Church$schedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklySchedule
     */
    select?: WeeklyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklySchedule
     */
    omit?: WeeklyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyScheduleInclude<ExtArgs> | null
    where?: WeeklyScheduleWhereInput
    orderBy?: WeeklyScheduleOrderByWithRelationInput | WeeklyScheduleOrderByWithRelationInput[]
    cursor?: WeeklyScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WeeklyScheduleScalarFieldEnum | WeeklyScheduleScalarFieldEnum[]
  }

  /**
   * Church.ministries
   */
  export type Church$ministriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministry
     */
    select?: MinistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministry
     */
    omit?: MinistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinistryInclude<ExtArgs> | null
    where?: MinistryWhereInput
    orderBy?: MinistryOrderByWithRelationInput | MinistryOrderByWithRelationInput[]
    cursor?: MinistryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MinistryScalarFieldEnum | MinistryScalarFieldEnum[]
  }

  /**
   * Church.volunteerScales
   */
  export type Church$volunteerScalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerScale
     */
    select?: VolunteerScaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerScale
     */
    omit?: VolunteerScaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerScaleInclude<ExtArgs> | null
    where?: VolunteerScaleWhereInput
    orderBy?: VolunteerScaleOrderByWithRelationInput | VolunteerScaleOrderByWithRelationInput[]
    cursor?: VolunteerScaleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VolunteerScaleScalarFieldEnum | VolunteerScaleScalarFieldEnum[]
  }

  /**
   * Church.financialEntries
   */
  export type Church$financialEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialEntry
     */
    select?: FinancialEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialEntry
     */
    omit?: FinancialEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialEntryInclude<ExtArgs> | null
    where?: FinancialEntryWhereInput
    orderBy?: FinancialEntryOrderByWithRelationInput | FinancialEntryOrderByWithRelationInput[]
    cursor?: FinancialEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FinancialEntryScalarFieldEnum | FinancialEntryScalarFieldEnum[]
  }

  /**
   * Church without action
   */
  export type ChurchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
  }


  /**
   * Model FinancialEntry
   */

  export type AggregateFinancialEntry = {
    _count: FinancialEntryCountAggregateOutputType | null
    _avg: FinancialEntryAvgAggregateOutputType | null
    _sum: FinancialEntrySumAggregateOutputType | null
    _min: FinancialEntryMinAggregateOutputType | null
    _max: FinancialEntryMaxAggregateOutputType | null
  }

  export type FinancialEntryAvgAggregateOutputType = {
    amount: number | null
  }

  export type FinancialEntrySumAggregateOutputType = {
    amount: number | null
  }

  export type FinancialEntryMinAggregateOutputType = {
    id: string | null
    amount: number | null
    category: string | null
    type: $Enums.EntryType | null
    date: Date | null
    donorName: string | null
    description: string | null
    churchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FinancialEntryMaxAggregateOutputType = {
    id: string | null
    amount: number | null
    category: string | null
    type: $Enums.EntryType | null
    date: Date | null
    donorName: string | null
    description: string | null
    churchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FinancialEntryCountAggregateOutputType = {
    id: number
    amount: number
    category: number
    type: number
    date: number
    donorName: number
    description: number
    churchId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FinancialEntryAvgAggregateInputType = {
    amount?: true
  }

  export type FinancialEntrySumAggregateInputType = {
    amount?: true
  }

  export type FinancialEntryMinAggregateInputType = {
    id?: true
    amount?: true
    category?: true
    type?: true
    date?: true
    donorName?: true
    description?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FinancialEntryMaxAggregateInputType = {
    id?: true
    amount?: true
    category?: true
    type?: true
    date?: true
    donorName?: true
    description?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FinancialEntryCountAggregateInputType = {
    id?: true
    amount?: true
    category?: true
    type?: true
    date?: true
    donorName?: true
    description?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FinancialEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FinancialEntry to aggregate.
     */
    where?: FinancialEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinancialEntries to fetch.
     */
    orderBy?: FinancialEntryOrderByWithRelationInput | FinancialEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FinancialEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinancialEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinancialEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FinancialEntries
    **/
    _count?: true | FinancialEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FinancialEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FinancialEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FinancialEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FinancialEntryMaxAggregateInputType
  }

  export type GetFinancialEntryAggregateType<T extends FinancialEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateFinancialEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFinancialEntry[P]>
      : GetScalarType<T[P], AggregateFinancialEntry[P]>
  }




  export type FinancialEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FinancialEntryWhereInput
    orderBy?: FinancialEntryOrderByWithAggregationInput | FinancialEntryOrderByWithAggregationInput[]
    by: FinancialEntryScalarFieldEnum[] | FinancialEntryScalarFieldEnum
    having?: FinancialEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FinancialEntryCountAggregateInputType | true
    _avg?: FinancialEntryAvgAggregateInputType
    _sum?: FinancialEntrySumAggregateInputType
    _min?: FinancialEntryMinAggregateInputType
    _max?: FinancialEntryMaxAggregateInputType
  }

  export type FinancialEntryGroupByOutputType = {
    id: string
    amount: number
    category: string
    type: $Enums.EntryType
    date: Date
    donorName: string | null
    description: string | null
    churchId: string
    createdAt: Date
    updatedAt: Date
    _count: FinancialEntryCountAggregateOutputType | null
    _avg: FinancialEntryAvgAggregateOutputType | null
    _sum: FinancialEntrySumAggregateOutputType | null
    _min: FinancialEntryMinAggregateOutputType | null
    _max: FinancialEntryMaxAggregateOutputType | null
  }

  type GetFinancialEntryGroupByPayload<T extends FinancialEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FinancialEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FinancialEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FinancialEntryGroupByOutputType[P]>
            : GetScalarType<T[P], FinancialEntryGroupByOutputType[P]>
        }
      >
    >


  export type FinancialEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    category?: boolean
    type?: boolean
    date?: boolean
    donorName?: boolean
    description?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["financialEntry"]>

  export type FinancialEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    category?: boolean
    type?: boolean
    date?: boolean
    donorName?: boolean
    description?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["financialEntry"]>

  export type FinancialEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    category?: boolean
    type?: boolean
    date?: boolean
    donorName?: boolean
    description?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["financialEntry"]>

  export type FinancialEntrySelectScalar = {
    id?: boolean
    amount?: boolean
    category?: boolean
    type?: boolean
    date?: boolean
    donorName?: boolean
    description?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FinancialEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amount" | "category" | "type" | "date" | "donorName" | "description" | "churchId" | "createdAt" | "updatedAt", ExtArgs["result"]["financialEntry"]>
  export type FinancialEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }
  export type FinancialEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }
  export type FinancialEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }

  export type $FinancialEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FinancialEntry"
    objects: {
      church: Prisma.$ChurchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      amount: number
      category: string
      type: $Enums.EntryType
      date: Date
      donorName: string | null
      description: string | null
      churchId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["financialEntry"]>
    composites: {}
  }

  type FinancialEntryGetPayload<S extends boolean | null | undefined | FinancialEntryDefaultArgs> = $Result.GetResult<Prisma.$FinancialEntryPayload, S>

  type FinancialEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FinancialEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FinancialEntryCountAggregateInputType | true
    }

  export interface FinancialEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FinancialEntry'], meta: { name: 'FinancialEntry' } }
    /**
     * Find zero or one FinancialEntry that matches the filter.
     * @param {FinancialEntryFindUniqueArgs} args - Arguments to find a FinancialEntry
     * @example
     * // Get one FinancialEntry
     * const financialEntry = await prisma.financialEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FinancialEntryFindUniqueArgs>(args: SelectSubset<T, FinancialEntryFindUniqueArgs<ExtArgs>>): Prisma__FinancialEntryClient<$Result.GetResult<Prisma.$FinancialEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FinancialEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FinancialEntryFindUniqueOrThrowArgs} args - Arguments to find a FinancialEntry
     * @example
     * // Get one FinancialEntry
     * const financialEntry = await prisma.financialEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FinancialEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, FinancialEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FinancialEntryClient<$Result.GetResult<Prisma.$FinancialEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FinancialEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialEntryFindFirstArgs} args - Arguments to find a FinancialEntry
     * @example
     * // Get one FinancialEntry
     * const financialEntry = await prisma.financialEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FinancialEntryFindFirstArgs>(args?: SelectSubset<T, FinancialEntryFindFirstArgs<ExtArgs>>): Prisma__FinancialEntryClient<$Result.GetResult<Prisma.$FinancialEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FinancialEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialEntryFindFirstOrThrowArgs} args - Arguments to find a FinancialEntry
     * @example
     * // Get one FinancialEntry
     * const financialEntry = await prisma.financialEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FinancialEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, FinancialEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__FinancialEntryClient<$Result.GetResult<Prisma.$FinancialEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FinancialEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FinancialEntries
     * const financialEntries = await prisma.financialEntry.findMany()
     * 
     * // Get first 10 FinancialEntries
     * const financialEntries = await prisma.financialEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const financialEntryWithIdOnly = await prisma.financialEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FinancialEntryFindManyArgs>(args?: SelectSubset<T, FinancialEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinancialEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FinancialEntry.
     * @param {FinancialEntryCreateArgs} args - Arguments to create a FinancialEntry.
     * @example
     * // Create one FinancialEntry
     * const FinancialEntry = await prisma.financialEntry.create({
     *   data: {
     *     // ... data to create a FinancialEntry
     *   }
     * })
     * 
     */
    create<T extends FinancialEntryCreateArgs>(args: SelectSubset<T, FinancialEntryCreateArgs<ExtArgs>>): Prisma__FinancialEntryClient<$Result.GetResult<Prisma.$FinancialEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FinancialEntries.
     * @param {FinancialEntryCreateManyArgs} args - Arguments to create many FinancialEntries.
     * @example
     * // Create many FinancialEntries
     * const financialEntry = await prisma.financialEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FinancialEntryCreateManyArgs>(args?: SelectSubset<T, FinancialEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FinancialEntries and returns the data saved in the database.
     * @param {FinancialEntryCreateManyAndReturnArgs} args - Arguments to create many FinancialEntries.
     * @example
     * // Create many FinancialEntries
     * const financialEntry = await prisma.financialEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FinancialEntries and only return the `id`
     * const financialEntryWithIdOnly = await prisma.financialEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FinancialEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, FinancialEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinancialEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FinancialEntry.
     * @param {FinancialEntryDeleteArgs} args - Arguments to delete one FinancialEntry.
     * @example
     * // Delete one FinancialEntry
     * const FinancialEntry = await prisma.financialEntry.delete({
     *   where: {
     *     // ... filter to delete one FinancialEntry
     *   }
     * })
     * 
     */
    delete<T extends FinancialEntryDeleteArgs>(args: SelectSubset<T, FinancialEntryDeleteArgs<ExtArgs>>): Prisma__FinancialEntryClient<$Result.GetResult<Prisma.$FinancialEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FinancialEntry.
     * @param {FinancialEntryUpdateArgs} args - Arguments to update one FinancialEntry.
     * @example
     * // Update one FinancialEntry
     * const financialEntry = await prisma.financialEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FinancialEntryUpdateArgs>(args: SelectSubset<T, FinancialEntryUpdateArgs<ExtArgs>>): Prisma__FinancialEntryClient<$Result.GetResult<Prisma.$FinancialEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FinancialEntries.
     * @param {FinancialEntryDeleteManyArgs} args - Arguments to filter FinancialEntries to delete.
     * @example
     * // Delete a few FinancialEntries
     * const { count } = await prisma.financialEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FinancialEntryDeleteManyArgs>(args?: SelectSubset<T, FinancialEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FinancialEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FinancialEntries
     * const financialEntry = await prisma.financialEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FinancialEntryUpdateManyArgs>(args: SelectSubset<T, FinancialEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FinancialEntries and returns the data updated in the database.
     * @param {FinancialEntryUpdateManyAndReturnArgs} args - Arguments to update many FinancialEntries.
     * @example
     * // Update many FinancialEntries
     * const financialEntry = await prisma.financialEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FinancialEntries and only return the `id`
     * const financialEntryWithIdOnly = await prisma.financialEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FinancialEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, FinancialEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinancialEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FinancialEntry.
     * @param {FinancialEntryUpsertArgs} args - Arguments to update or create a FinancialEntry.
     * @example
     * // Update or create a FinancialEntry
     * const financialEntry = await prisma.financialEntry.upsert({
     *   create: {
     *     // ... data to create a FinancialEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FinancialEntry we want to update
     *   }
     * })
     */
    upsert<T extends FinancialEntryUpsertArgs>(args: SelectSubset<T, FinancialEntryUpsertArgs<ExtArgs>>): Prisma__FinancialEntryClient<$Result.GetResult<Prisma.$FinancialEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FinancialEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialEntryCountArgs} args - Arguments to filter FinancialEntries to count.
     * @example
     * // Count the number of FinancialEntries
     * const count = await prisma.financialEntry.count({
     *   where: {
     *     // ... the filter for the FinancialEntries we want to count
     *   }
     * })
    **/
    count<T extends FinancialEntryCountArgs>(
      args?: Subset<T, FinancialEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FinancialEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FinancialEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FinancialEntryAggregateArgs>(args: Subset<T, FinancialEntryAggregateArgs>): Prisma.PrismaPromise<GetFinancialEntryAggregateType<T>>

    /**
     * Group by FinancialEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FinancialEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FinancialEntryGroupByArgs['orderBy'] }
        : { orderBy?: FinancialEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FinancialEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFinancialEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FinancialEntry model
   */
  readonly fields: FinancialEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FinancialEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FinancialEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    church<T extends ChurchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChurchDefaultArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FinancialEntry model
   */
  interface FinancialEntryFieldRefs {
    readonly id: FieldRef<"FinancialEntry", 'String'>
    readonly amount: FieldRef<"FinancialEntry", 'Float'>
    readonly category: FieldRef<"FinancialEntry", 'String'>
    readonly type: FieldRef<"FinancialEntry", 'EntryType'>
    readonly date: FieldRef<"FinancialEntry", 'DateTime'>
    readonly donorName: FieldRef<"FinancialEntry", 'String'>
    readonly description: FieldRef<"FinancialEntry", 'String'>
    readonly churchId: FieldRef<"FinancialEntry", 'String'>
    readonly createdAt: FieldRef<"FinancialEntry", 'DateTime'>
    readonly updatedAt: FieldRef<"FinancialEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FinancialEntry findUnique
   */
  export type FinancialEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialEntry
     */
    select?: FinancialEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialEntry
     */
    omit?: FinancialEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialEntryInclude<ExtArgs> | null
    /**
     * Filter, which FinancialEntry to fetch.
     */
    where: FinancialEntryWhereUniqueInput
  }

  /**
   * FinancialEntry findUniqueOrThrow
   */
  export type FinancialEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialEntry
     */
    select?: FinancialEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialEntry
     */
    omit?: FinancialEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialEntryInclude<ExtArgs> | null
    /**
     * Filter, which FinancialEntry to fetch.
     */
    where: FinancialEntryWhereUniqueInput
  }

  /**
   * FinancialEntry findFirst
   */
  export type FinancialEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialEntry
     */
    select?: FinancialEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialEntry
     */
    omit?: FinancialEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialEntryInclude<ExtArgs> | null
    /**
     * Filter, which FinancialEntry to fetch.
     */
    where?: FinancialEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinancialEntries to fetch.
     */
    orderBy?: FinancialEntryOrderByWithRelationInput | FinancialEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FinancialEntries.
     */
    cursor?: FinancialEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinancialEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinancialEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FinancialEntries.
     */
    distinct?: FinancialEntryScalarFieldEnum | FinancialEntryScalarFieldEnum[]
  }

  /**
   * FinancialEntry findFirstOrThrow
   */
  export type FinancialEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialEntry
     */
    select?: FinancialEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialEntry
     */
    omit?: FinancialEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialEntryInclude<ExtArgs> | null
    /**
     * Filter, which FinancialEntry to fetch.
     */
    where?: FinancialEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinancialEntries to fetch.
     */
    orderBy?: FinancialEntryOrderByWithRelationInput | FinancialEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FinancialEntries.
     */
    cursor?: FinancialEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinancialEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinancialEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FinancialEntries.
     */
    distinct?: FinancialEntryScalarFieldEnum | FinancialEntryScalarFieldEnum[]
  }

  /**
   * FinancialEntry findMany
   */
  export type FinancialEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialEntry
     */
    select?: FinancialEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialEntry
     */
    omit?: FinancialEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialEntryInclude<ExtArgs> | null
    /**
     * Filter, which FinancialEntries to fetch.
     */
    where?: FinancialEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinancialEntries to fetch.
     */
    orderBy?: FinancialEntryOrderByWithRelationInput | FinancialEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FinancialEntries.
     */
    cursor?: FinancialEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinancialEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinancialEntries.
     */
    skip?: number
    distinct?: FinancialEntryScalarFieldEnum | FinancialEntryScalarFieldEnum[]
  }

  /**
   * FinancialEntry create
   */
  export type FinancialEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialEntry
     */
    select?: FinancialEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialEntry
     */
    omit?: FinancialEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a FinancialEntry.
     */
    data: XOR<FinancialEntryCreateInput, FinancialEntryUncheckedCreateInput>
  }

  /**
   * FinancialEntry createMany
   */
  export type FinancialEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FinancialEntries.
     */
    data: FinancialEntryCreateManyInput | FinancialEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FinancialEntry createManyAndReturn
   */
  export type FinancialEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialEntry
     */
    select?: FinancialEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialEntry
     */
    omit?: FinancialEntryOmit<ExtArgs> | null
    /**
     * The data used to create many FinancialEntries.
     */
    data: FinancialEntryCreateManyInput | FinancialEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FinancialEntry update
   */
  export type FinancialEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialEntry
     */
    select?: FinancialEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialEntry
     */
    omit?: FinancialEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a FinancialEntry.
     */
    data: XOR<FinancialEntryUpdateInput, FinancialEntryUncheckedUpdateInput>
    /**
     * Choose, which FinancialEntry to update.
     */
    where: FinancialEntryWhereUniqueInput
  }

  /**
   * FinancialEntry updateMany
   */
  export type FinancialEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FinancialEntries.
     */
    data: XOR<FinancialEntryUpdateManyMutationInput, FinancialEntryUncheckedUpdateManyInput>
    /**
     * Filter which FinancialEntries to update
     */
    where?: FinancialEntryWhereInput
    /**
     * Limit how many FinancialEntries to update.
     */
    limit?: number
  }

  /**
   * FinancialEntry updateManyAndReturn
   */
  export type FinancialEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialEntry
     */
    select?: FinancialEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialEntry
     */
    omit?: FinancialEntryOmit<ExtArgs> | null
    /**
     * The data used to update FinancialEntries.
     */
    data: XOR<FinancialEntryUpdateManyMutationInput, FinancialEntryUncheckedUpdateManyInput>
    /**
     * Filter which FinancialEntries to update
     */
    where?: FinancialEntryWhereInput
    /**
     * Limit how many FinancialEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FinancialEntry upsert
   */
  export type FinancialEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialEntry
     */
    select?: FinancialEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialEntry
     */
    omit?: FinancialEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the FinancialEntry to update in case it exists.
     */
    where: FinancialEntryWhereUniqueInput
    /**
     * In case the FinancialEntry found by the `where` argument doesn't exist, create a new FinancialEntry with this data.
     */
    create: XOR<FinancialEntryCreateInput, FinancialEntryUncheckedCreateInput>
    /**
     * In case the FinancialEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FinancialEntryUpdateInput, FinancialEntryUncheckedUpdateInput>
  }

  /**
   * FinancialEntry delete
   */
  export type FinancialEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialEntry
     */
    select?: FinancialEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialEntry
     */
    omit?: FinancialEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialEntryInclude<ExtArgs> | null
    /**
     * Filter which FinancialEntry to delete.
     */
    where: FinancialEntryWhereUniqueInput
  }

  /**
   * FinancialEntry deleteMany
   */
  export type FinancialEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FinancialEntries to delete
     */
    where?: FinancialEntryWhereInput
    /**
     * Limit how many FinancialEntries to delete.
     */
    limit?: number
  }

  /**
   * FinancialEntry without action
   */
  export type FinancialEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialEntry
     */
    select?: FinancialEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialEntry
     */
    omit?: FinancialEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialEntryInclude<ExtArgs> | null
  }


  /**
   * Model ChurchLink
   */

  export type AggregateChurchLink = {
    _count: ChurchLinkCountAggregateOutputType | null
    _avg: ChurchLinkAvgAggregateOutputType | null
    _sum: ChurchLinkSumAggregateOutputType | null
    _min: ChurchLinkMinAggregateOutputType | null
    _max: ChurchLinkMaxAggregateOutputType | null
  }

  export type ChurchLinkAvgAggregateOutputType = {
    order: number | null
  }

  export type ChurchLinkSumAggregateOutputType = {
    order: number | null
  }

  export type ChurchLinkMinAggregateOutputType = {
    id: string | null
    title: string | null
    url: string | null
    icon: string | null
    active: boolean | null
    order: number | null
    churchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChurchLinkMaxAggregateOutputType = {
    id: string | null
    title: string | null
    url: string | null
    icon: string | null
    active: boolean | null
    order: number | null
    churchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChurchLinkCountAggregateOutputType = {
    id: number
    title: number
    url: number
    icon: number
    active: number
    order: number
    churchId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChurchLinkAvgAggregateInputType = {
    order?: true
  }

  export type ChurchLinkSumAggregateInputType = {
    order?: true
  }

  export type ChurchLinkMinAggregateInputType = {
    id?: true
    title?: true
    url?: true
    icon?: true
    active?: true
    order?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChurchLinkMaxAggregateInputType = {
    id?: true
    title?: true
    url?: true
    icon?: true
    active?: true
    order?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChurchLinkCountAggregateInputType = {
    id?: true
    title?: true
    url?: true
    icon?: true
    active?: true
    order?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChurchLinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChurchLink to aggregate.
     */
    where?: ChurchLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChurchLinks to fetch.
     */
    orderBy?: ChurchLinkOrderByWithRelationInput | ChurchLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChurchLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChurchLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChurchLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChurchLinks
    **/
    _count?: true | ChurchLinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChurchLinkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChurchLinkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChurchLinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChurchLinkMaxAggregateInputType
  }

  export type GetChurchLinkAggregateType<T extends ChurchLinkAggregateArgs> = {
        [P in keyof T & keyof AggregateChurchLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChurchLink[P]>
      : GetScalarType<T[P], AggregateChurchLink[P]>
  }




  export type ChurchLinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChurchLinkWhereInput
    orderBy?: ChurchLinkOrderByWithAggregationInput | ChurchLinkOrderByWithAggregationInput[]
    by: ChurchLinkScalarFieldEnum[] | ChurchLinkScalarFieldEnum
    having?: ChurchLinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChurchLinkCountAggregateInputType | true
    _avg?: ChurchLinkAvgAggregateInputType
    _sum?: ChurchLinkSumAggregateInputType
    _min?: ChurchLinkMinAggregateInputType
    _max?: ChurchLinkMaxAggregateInputType
  }

  export type ChurchLinkGroupByOutputType = {
    id: string
    title: string
    url: string
    icon: string | null
    active: boolean
    order: number
    churchId: string
    createdAt: Date
    updatedAt: Date
    _count: ChurchLinkCountAggregateOutputType | null
    _avg: ChurchLinkAvgAggregateOutputType | null
    _sum: ChurchLinkSumAggregateOutputType | null
    _min: ChurchLinkMinAggregateOutputType | null
    _max: ChurchLinkMaxAggregateOutputType | null
  }

  type GetChurchLinkGroupByPayload<T extends ChurchLinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChurchLinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChurchLinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChurchLinkGroupByOutputType[P]>
            : GetScalarType<T[P], ChurchLinkGroupByOutputType[P]>
        }
      >
    >


  export type ChurchLinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    url?: boolean
    icon?: boolean
    active?: boolean
    order?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["churchLink"]>

  export type ChurchLinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    url?: boolean
    icon?: boolean
    active?: boolean
    order?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["churchLink"]>

  export type ChurchLinkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    url?: boolean
    icon?: boolean
    active?: boolean
    order?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["churchLink"]>

  export type ChurchLinkSelectScalar = {
    id?: boolean
    title?: boolean
    url?: boolean
    icon?: boolean
    active?: boolean
    order?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ChurchLinkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "url" | "icon" | "active" | "order" | "churchId" | "createdAt" | "updatedAt", ExtArgs["result"]["churchLink"]>
  export type ChurchLinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }
  export type ChurchLinkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }
  export type ChurchLinkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }

  export type $ChurchLinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChurchLink"
    objects: {
      church: Prisma.$ChurchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      url: string
      icon: string | null
      active: boolean
      order: number
      churchId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["churchLink"]>
    composites: {}
  }

  type ChurchLinkGetPayload<S extends boolean | null | undefined | ChurchLinkDefaultArgs> = $Result.GetResult<Prisma.$ChurchLinkPayload, S>

  type ChurchLinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChurchLinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChurchLinkCountAggregateInputType | true
    }

  export interface ChurchLinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChurchLink'], meta: { name: 'ChurchLink' } }
    /**
     * Find zero or one ChurchLink that matches the filter.
     * @param {ChurchLinkFindUniqueArgs} args - Arguments to find a ChurchLink
     * @example
     * // Get one ChurchLink
     * const churchLink = await prisma.churchLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChurchLinkFindUniqueArgs>(args: SelectSubset<T, ChurchLinkFindUniqueArgs<ExtArgs>>): Prisma__ChurchLinkClient<$Result.GetResult<Prisma.$ChurchLinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChurchLink that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChurchLinkFindUniqueOrThrowArgs} args - Arguments to find a ChurchLink
     * @example
     * // Get one ChurchLink
     * const churchLink = await prisma.churchLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChurchLinkFindUniqueOrThrowArgs>(args: SelectSubset<T, ChurchLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChurchLinkClient<$Result.GetResult<Prisma.$ChurchLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChurchLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchLinkFindFirstArgs} args - Arguments to find a ChurchLink
     * @example
     * // Get one ChurchLink
     * const churchLink = await prisma.churchLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChurchLinkFindFirstArgs>(args?: SelectSubset<T, ChurchLinkFindFirstArgs<ExtArgs>>): Prisma__ChurchLinkClient<$Result.GetResult<Prisma.$ChurchLinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChurchLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchLinkFindFirstOrThrowArgs} args - Arguments to find a ChurchLink
     * @example
     * // Get one ChurchLink
     * const churchLink = await prisma.churchLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChurchLinkFindFirstOrThrowArgs>(args?: SelectSubset<T, ChurchLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChurchLinkClient<$Result.GetResult<Prisma.$ChurchLinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChurchLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChurchLinks
     * const churchLinks = await prisma.churchLink.findMany()
     * 
     * // Get first 10 ChurchLinks
     * const churchLinks = await prisma.churchLink.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const churchLinkWithIdOnly = await prisma.churchLink.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChurchLinkFindManyArgs>(args?: SelectSubset<T, ChurchLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChurchLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChurchLink.
     * @param {ChurchLinkCreateArgs} args - Arguments to create a ChurchLink.
     * @example
     * // Create one ChurchLink
     * const ChurchLink = await prisma.churchLink.create({
     *   data: {
     *     // ... data to create a ChurchLink
     *   }
     * })
     * 
     */
    create<T extends ChurchLinkCreateArgs>(args: SelectSubset<T, ChurchLinkCreateArgs<ExtArgs>>): Prisma__ChurchLinkClient<$Result.GetResult<Prisma.$ChurchLinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChurchLinks.
     * @param {ChurchLinkCreateManyArgs} args - Arguments to create many ChurchLinks.
     * @example
     * // Create many ChurchLinks
     * const churchLink = await prisma.churchLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChurchLinkCreateManyArgs>(args?: SelectSubset<T, ChurchLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChurchLinks and returns the data saved in the database.
     * @param {ChurchLinkCreateManyAndReturnArgs} args - Arguments to create many ChurchLinks.
     * @example
     * // Create many ChurchLinks
     * const churchLink = await prisma.churchLink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChurchLinks and only return the `id`
     * const churchLinkWithIdOnly = await prisma.churchLink.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChurchLinkCreateManyAndReturnArgs>(args?: SelectSubset<T, ChurchLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChurchLinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChurchLink.
     * @param {ChurchLinkDeleteArgs} args - Arguments to delete one ChurchLink.
     * @example
     * // Delete one ChurchLink
     * const ChurchLink = await prisma.churchLink.delete({
     *   where: {
     *     // ... filter to delete one ChurchLink
     *   }
     * })
     * 
     */
    delete<T extends ChurchLinkDeleteArgs>(args: SelectSubset<T, ChurchLinkDeleteArgs<ExtArgs>>): Prisma__ChurchLinkClient<$Result.GetResult<Prisma.$ChurchLinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChurchLink.
     * @param {ChurchLinkUpdateArgs} args - Arguments to update one ChurchLink.
     * @example
     * // Update one ChurchLink
     * const churchLink = await prisma.churchLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChurchLinkUpdateArgs>(args: SelectSubset<T, ChurchLinkUpdateArgs<ExtArgs>>): Prisma__ChurchLinkClient<$Result.GetResult<Prisma.$ChurchLinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChurchLinks.
     * @param {ChurchLinkDeleteManyArgs} args - Arguments to filter ChurchLinks to delete.
     * @example
     * // Delete a few ChurchLinks
     * const { count } = await prisma.churchLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChurchLinkDeleteManyArgs>(args?: SelectSubset<T, ChurchLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChurchLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChurchLinks
     * const churchLink = await prisma.churchLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChurchLinkUpdateManyArgs>(args: SelectSubset<T, ChurchLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChurchLinks and returns the data updated in the database.
     * @param {ChurchLinkUpdateManyAndReturnArgs} args - Arguments to update many ChurchLinks.
     * @example
     * // Update many ChurchLinks
     * const churchLink = await prisma.churchLink.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChurchLinks and only return the `id`
     * const churchLinkWithIdOnly = await prisma.churchLink.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChurchLinkUpdateManyAndReturnArgs>(args: SelectSubset<T, ChurchLinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChurchLinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChurchLink.
     * @param {ChurchLinkUpsertArgs} args - Arguments to update or create a ChurchLink.
     * @example
     * // Update or create a ChurchLink
     * const churchLink = await prisma.churchLink.upsert({
     *   create: {
     *     // ... data to create a ChurchLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChurchLink we want to update
     *   }
     * })
     */
    upsert<T extends ChurchLinkUpsertArgs>(args: SelectSubset<T, ChurchLinkUpsertArgs<ExtArgs>>): Prisma__ChurchLinkClient<$Result.GetResult<Prisma.$ChurchLinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChurchLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchLinkCountArgs} args - Arguments to filter ChurchLinks to count.
     * @example
     * // Count the number of ChurchLinks
     * const count = await prisma.churchLink.count({
     *   where: {
     *     // ... the filter for the ChurchLinks we want to count
     *   }
     * })
    **/
    count<T extends ChurchLinkCountArgs>(
      args?: Subset<T, ChurchLinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChurchLinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChurchLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChurchLinkAggregateArgs>(args: Subset<T, ChurchLinkAggregateArgs>): Prisma.PrismaPromise<GetChurchLinkAggregateType<T>>

    /**
     * Group by ChurchLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChurchLinkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChurchLinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChurchLinkGroupByArgs['orderBy'] }
        : { orderBy?: ChurchLinkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChurchLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChurchLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChurchLink model
   */
  readonly fields: ChurchLinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChurchLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChurchLinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    church<T extends ChurchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChurchDefaultArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChurchLink model
   */
  interface ChurchLinkFieldRefs {
    readonly id: FieldRef<"ChurchLink", 'String'>
    readonly title: FieldRef<"ChurchLink", 'String'>
    readonly url: FieldRef<"ChurchLink", 'String'>
    readonly icon: FieldRef<"ChurchLink", 'String'>
    readonly active: FieldRef<"ChurchLink", 'Boolean'>
    readonly order: FieldRef<"ChurchLink", 'Int'>
    readonly churchId: FieldRef<"ChurchLink", 'String'>
    readonly createdAt: FieldRef<"ChurchLink", 'DateTime'>
    readonly updatedAt: FieldRef<"ChurchLink", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChurchLink findUnique
   */
  export type ChurchLinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChurchLink
     */
    select?: ChurchLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChurchLink
     */
    omit?: ChurchLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchLinkInclude<ExtArgs> | null
    /**
     * Filter, which ChurchLink to fetch.
     */
    where: ChurchLinkWhereUniqueInput
  }

  /**
   * ChurchLink findUniqueOrThrow
   */
  export type ChurchLinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChurchLink
     */
    select?: ChurchLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChurchLink
     */
    omit?: ChurchLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchLinkInclude<ExtArgs> | null
    /**
     * Filter, which ChurchLink to fetch.
     */
    where: ChurchLinkWhereUniqueInput
  }

  /**
   * ChurchLink findFirst
   */
  export type ChurchLinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChurchLink
     */
    select?: ChurchLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChurchLink
     */
    omit?: ChurchLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchLinkInclude<ExtArgs> | null
    /**
     * Filter, which ChurchLink to fetch.
     */
    where?: ChurchLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChurchLinks to fetch.
     */
    orderBy?: ChurchLinkOrderByWithRelationInput | ChurchLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChurchLinks.
     */
    cursor?: ChurchLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChurchLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChurchLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChurchLinks.
     */
    distinct?: ChurchLinkScalarFieldEnum | ChurchLinkScalarFieldEnum[]
  }

  /**
   * ChurchLink findFirstOrThrow
   */
  export type ChurchLinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChurchLink
     */
    select?: ChurchLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChurchLink
     */
    omit?: ChurchLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchLinkInclude<ExtArgs> | null
    /**
     * Filter, which ChurchLink to fetch.
     */
    where?: ChurchLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChurchLinks to fetch.
     */
    orderBy?: ChurchLinkOrderByWithRelationInput | ChurchLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChurchLinks.
     */
    cursor?: ChurchLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChurchLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChurchLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChurchLinks.
     */
    distinct?: ChurchLinkScalarFieldEnum | ChurchLinkScalarFieldEnum[]
  }

  /**
   * ChurchLink findMany
   */
  export type ChurchLinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChurchLink
     */
    select?: ChurchLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChurchLink
     */
    omit?: ChurchLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchLinkInclude<ExtArgs> | null
    /**
     * Filter, which ChurchLinks to fetch.
     */
    where?: ChurchLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChurchLinks to fetch.
     */
    orderBy?: ChurchLinkOrderByWithRelationInput | ChurchLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChurchLinks.
     */
    cursor?: ChurchLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChurchLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChurchLinks.
     */
    skip?: number
    distinct?: ChurchLinkScalarFieldEnum | ChurchLinkScalarFieldEnum[]
  }

  /**
   * ChurchLink create
   */
  export type ChurchLinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChurchLink
     */
    select?: ChurchLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChurchLink
     */
    omit?: ChurchLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchLinkInclude<ExtArgs> | null
    /**
     * The data needed to create a ChurchLink.
     */
    data: XOR<ChurchLinkCreateInput, ChurchLinkUncheckedCreateInput>
  }

  /**
   * ChurchLink createMany
   */
  export type ChurchLinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChurchLinks.
     */
    data: ChurchLinkCreateManyInput | ChurchLinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChurchLink createManyAndReturn
   */
  export type ChurchLinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChurchLink
     */
    select?: ChurchLinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChurchLink
     */
    omit?: ChurchLinkOmit<ExtArgs> | null
    /**
     * The data used to create many ChurchLinks.
     */
    data: ChurchLinkCreateManyInput | ChurchLinkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchLinkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChurchLink update
   */
  export type ChurchLinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChurchLink
     */
    select?: ChurchLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChurchLink
     */
    omit?: ChurchLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchLinkInclude<ExtArgs> | null
    /**
     * The data needed to update a ChurchLink.
     */
    data: XOR<ChurchLinkUpdateInput, ChurchLinkUncheckedUpdateInput>
    /**
     * Choose, which ChurchLink to update.
     */
    where: ChurchLinkWhereUniqueInput
  }

  /**
   * ChurchLink updateMany
   */
  export type ChurchLinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChurchLinks.
     */
    data: XOR<ChurchLinkUpdateManyMutationInput, ChurchLinkUncheckedUpdateManyInput>
    /**
     * Filter which ChurchLinks to update
     */
    where?: ChurchLinkWhereInput
    /**
     * Limit how many ChurchLinks to update.
     */
    limit?: number
  }

  /**
   * ChurchLink updateManyAndReturn
   */
  export type ChurchLinkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChurchLink
     */
    select?: ChurchLinkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChurchLink
     */
    omit?: ChurchLinkOmit<ExtArgs> | null
    /**
     * The data used to update ChurchLinks.
     */
    data: XOR<ChurchLinkUpdateManyMutationInput, ChurchLinkUncheckedUpdateManyInput>
    /**
     * Filter which ChurchLinks to update
     */
    where?: ChurchLinkWhereInput
    /**
     * Limit how many ChurchLinks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchLinkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChurchLink upsert
   */
  export type ChurchLinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChurchLink
     */
    select?: ChurchLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChurchLink
     */
    omit?: ChurchLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchLinkInclude<ExtArgs> | null
    /**
     * The filter to search for the ChurchLink to update in case it exists.
     */
    where: ChurchLinkWhereUniqueInput
    /**
     * In case the ChurchLink found by the `where` argument doesn't exist, create a new ChurchLink with this data.
     */
    create: XOR<ChurchLinkCreateInput, ChurchLinkUncheckedCreateInput>
    /**
     * In case the ChurchLink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChurchLinkUpdateInput, ChurchLinkUncheckedUpdateInput>
  }

  /**
   * ChurchLink delete
   */
  export type ChurchLinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChurchLink
     */
    select?: ChurchLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChurchLink
     */
    omit?: ChurchLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchLinkInclude<ExtArgs> | null
    /**
     * Filter which ChurchLink to delete.
     */
    where: ChurchLinkWhereUniqueInput
  }

  /**
   * ChurchLink deleteMany
   */
  export type ChurchLinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChurchLinks to delete
     */
    where?: ChurchLinkWhereInput
    /**
     * Limit how many ChurchLinks to delete.
     */
    limit?: number
  }

  /**
   * ChurchLink without action
   */
  export type ChurchLinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChurchLink
     */
    select?: ChurchLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChurchLink
     */
    omit?: ChurchLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchLinkInclude<ExtArgs> | null
  }


  /**
   * Model WeeklySchedule
   */

  export type AggregateWeeklySchedule = {
    _count: WeeklyScheduleCountAggregateOutputType | null
    _min: WeeklyScheduleMinAggregateOutputType | null
    _max: WeeklyScheduleMaxAggregateOutputType | null
  }

  export type WeeklyScheduleMinAggregateOutputType = {
    id: string | null
    title: string | null
    dayOfWeek: $Enums.DayOfWeek | null
    time: string | null
    description: string | null
    active: boolean | null
    churchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WeeklyScheduleMaxAggregateOutputType = {
    id: string | null
    title: string | null
    dayOfWeek: $Enums.DayOfWeek | null
    time: string | null
    description: string | null
    active: boolean | null
    churchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WeeklyScheduleCountAggregateOutputType = {
    id: number
    title: number
    dayOfWeek: number
    time: number
    description: number
    active: number
    churchId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WeeklyScheduleMinAggregateInputType = {
    id?: true
    title?: true
    dayOfWeek?: true
    time?: true
    description?: true
    active?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WeeklyScheduleMaxAggregateInputType = {
    id?: true
    title?: true
    dayOfWeek?: true
    time?: true
    description?: true
    active?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WeeklyScheduleCountAggregateInputType = {
    id?: true
    title?: true
    dayOfWeek?: true
    time?: true
    description?: true
    active?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WeeklyScheduleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeeklySchedule to aggregate.
     */
    where?: WeeklyScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklySchedules to fetch.
     */
    orderBy?: WeeklyScheduleOrderByWithRelationInput | WeeklyScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WeeklyScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklySchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklySchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WeeklySchedules
    **/
    _count?: true | WeeklyScheduleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WeeklyScheduleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WeeklyScheduleMaxAggregateInputType
  }

  export type GetWeeklyScheduleAggregateType<T extends WeeklyScheduleAggregateArgs> = {
        [P in keyof T & keyof AggregateWeeklySchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWeeklySchedule[P]>
      : GetScalarType<T[P], AggregateWeeklySchedule[P]>
  }




  export type WeeklyScheduleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeeklyScheduleWhereInput
    orderBy?: WeeklyScheduleOrderByWithAggregationInput | WeeklyScheduleOrderByWithAggregationInput[]
    by: WeeklyScheduleScalarFieldEnum[] | WeeklyScheduleScalarFieldEnum
    having?: WeeklyScheduleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WeeklyScheduleCountAggregateInputType | true
    _min?: WeeklyScheduleMinAggregateInputType
    _max?: WeeklyScheduleMaxAggregateInputType
  }

  export type WeeklyScheduleGroupByOutputType = {
    id: string
    title: string
    dayOfWeek: $Enums.DayOfWeek
    time: string
    description: string | null
    active: boolean
    churchId: string
    createdAt: Date
    updatedAt: Date
    _count: WeeklyScheduleCountAggregateOutputType | null
    _min: WeeklyScheduleMinAggregateOutputType | null
    _max: WeeklyScheduleMaxAggregateOutputType | null
  }

  type GetWeeklyScheduleGroupByPayload<T extends WeeklyScheduleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WeeklyScheduleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WeeklyScheduleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WeeklyScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], WeeklyScheduleGroupByOutputType[P]>
        }
      >
    >


  export type WeeklyScheduleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    dayOfWeek?: boolean
    time?: boolean
    description?: boolean
    active?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weeklySchedule"]>

  export type WeeklyScheduleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    dayOfWeek?: boolean
    time?: boolean
    description?: boolean
    active?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weeklySchedule"]>

  export type WeeklyScheduleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    dayOfWeek?: boolean
    time?: boolean
    description?: boolean
    active?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weeklySchedule"]>

  export type WeeklyScheduleSelectScalar = {
    id?: boolean
    title?: boolean
    dayOfWeek?: boolean
    time?: boolean
    description?: boolean
    active?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WeeklyScheduleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "dayOfWeek" | "time" | "description" | "active" | "churchId" | "createdAt" | "updatedAt", ExtArgs["result"]["weeklySchedule"]>
  export type WeeklyScheduleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }
  export type WeeklyScheduleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }
  export type WeeklyScheduleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }

  export type $WeeklySchedulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WeeklySchedule"
    objects: {
      church: Prisma.$ChurchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      dayOfWeek: $Enums.DayOfWeek
      time: string
      description: string | null
      active: boolean
      churchId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["weeklySchedule"]>
    composites: {}
  }

  type WeeklyScheduleGetPayload<S extends boolean | null | undefined | WeeklyScheduleDefaultArgs> = $Result.GetResult<Prisma.$WeeklySchedulePayload, S>

  type WeeklyScheduleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WeeklyScheduleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WeeklyScheduleCountAggregateInputType | true
    }

  export interface WeeklyScheduleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WeeklySchedule'], meta: { name: 'WeeklySchedule' } }
    /**
     * Find zero or one WeeklySchedule that matches the filter.
     * @param {WeeklyScheduleFindUniqueArgs} args - Arguments to find a WeeklySchedule
     * @example
     * // Get one WeeklySchedule
     * const weeklySchedule = await prisma.weeklySchedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WeeklyScheduleFindUniqueArgs>(args: SelectSubset<T, WeeklyScheduleFindUniqueArgs<ExtArgs>>): Prisma__WeeklyScheduleClient<$Result.GetResult<Prisma.$WeeklySchedulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WeeklySchedule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WeeklyScheduleFindUniqueOrThrowArgs} args - Arguments to find a WeeklySchedule
     * @example
     * // Get one WeeklySchedule
     * const weeklySchedule = await prisma.weeklySchedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WeeklyScheduleFindUniqueOrThrowArgs>(args: SelectSubset<T, WeeklyScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WeeklyScheduleClient<$Result.GetResult<Prisma.$WeeklySchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeeklySchedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyScheduleFindFirstArgs} args - Arguments to find a WeeklySchedule
     * @example
     * // Get one WeeklySchedule
     * const weeklySchedule = await prisma.weeklySchedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WeeklyScheduleFindFirstArgs>(args?: SelectSubset<T, WeeklyScheduleFindFirstArgs<ExtArgs>>): Prisma__WeeklyScheduleClient<$Result.GetResult<Prisma.$WeeklySchedulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeeklySchedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyScheduleFindFirstOrThrowArgs} args - Arguments to find a WeeklySchedule
     * @example
     * // Get one WeeklySchedule
     * const weeklySchedule = await prisma.weeklySchedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WeeklyScheduleFindFirstOrThrowArgs>(args?: SelectSubset<T, WeeklyScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma__WeeklyScheduleClient<$Result.GetResult<Prisma.$WeeklySchedulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WeeklySchedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WeeklySchedules
     * const weeklySchedules = await prisma.weeklySchedule.findMany()
     * 
     * // Get first 10 WeeklySchedules
     * const weeklySchedules = await prisma.weeklySchedule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const weeklyScheduleWithIdOnly = await prisma.weeklySchedule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WeeklyScheduleFindManyArgs>(args?: SelectSubset<T, WeeklyScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklySchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WeeklySchedule.
     * @param {WeeklyScheduleCreateArgs} args - Arguments to create a WeeklySchedule.
     * @example
     * // Create one WeeklySchedule
     * const WeeklySchedule = await prisma.weeklySchedule.create({
     *   data: {
     *     // ... data to create a WeeklySchedule
     *   }
     * })
     * 
     */
    create<T extends WeeklyScheduleCreateArgs>(args: SelectSubset<T, WeeklyScheduleCreateArgs<ExtArgs>>): Prisma__WeeklyScheduleClient<$Result.GetResult<Prisma.$WeeklySchedulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WeeklySchedules.
     * @param {WeeklyScheduleCreateManyArgs} args - Arguments to create many WeeklySchedules.
     * @example
     * // Create many WeeklySchedules
     * const weeklySchedule = await prisma.weeklySchedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WeeklyScheduleCreateManyArgs>(args?: SelectSubset<T, WeeklyScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WeeklySchedules and returns the data saved in the database.
     * @param {WeeklyScheduleCreateManyAndReturnArgs} args - Arguments to create many WeeklySchedules.
     * @example
     * // Create many WeeklySchedules
     * const weeklySchedule = await prisma.weeklySchedule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WeeklySchedules and only return the `id`
     * const weeklyScheduleWithIdOnly = await prisma.weeklySchedule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WeeklyScheduleCreateManyAndReturnArgs>(args?: SelectSubset<T, WeeklyScheduleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklySchedulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WeeklySchedule.
     * @param {WeeklyScheduleDeleteArgs} args - Arguments to delete one WeeklySchedule.
     * @example
     * // Delete one WeeklySchedule
     * const WeeklySchedule = await prisma.weeklySchedule.delete({
     *   where: {
     *     // ... filter to delete one WeeklySchedule
     *   }
     * })
     * 
     */
    delete<T extends WeeklyScheduleDeleteArgs>(args: SelectSubset<T, WeeklyScheduleDeleteArgs<ExtArgs>>): Prisma__WeeklyScheduleClient<$Result.GetResult<Prisma.$WeeklySchedulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WeeklySchedule.
     * @param {WeeklyScheduleUpdateArgs} args - Arguments to update one WeeklySchedule.
     * @example
     * // Update one WeeklySchedule
     * const weeklySchedule = await prisma.weeklySchedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WeeklyScheduleUpdateArgs>(args: SelectSubset<T, WeeklyScheduleUpdateArgs<ExtArgs>>): Prisma__WeeklyScheduleClient<$Result.GetResult<Prisma.$WeeklySchedulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WeeklySchedules.
     * @param {WeeklyScheduleDeleteManyArgs} args - Arguments to filter WeeklySchedules to delete.
     * @example
     * // Delete a few WeeklySchedules
     * const { count } = await prisma.weeklySchedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WeeklyScheduleDeleteManyArgs>(args?: SelectSubset<T, WeeklyScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeeklySchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WeeklySchedules
     * const weeklySchedule = await prisma.weeklySchedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WeeklyScheduleUpdateManyArgs>(args: SelectSubset<T, WeeklyScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeeklySchedules and returns the data updated in the database.
     * @param {WeeklyScheduleUpdateManyAndReturnArgs} args - Arguments to update many WeeklySchedules.
     * @example
     * // Update many WeeklySchedules
     * const weeklySchedule = await prisma.weeklySchedule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WeeklySchedules and only return the `id`
     * const weeklyScheduleWithIdOnly = await prisma.weeklySchedule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WeeklyScheduleUpdateManyAndReturnArgs>(args: SelectSubset<T, WeeklyScheduleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklySchedulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WeeklySchedule.
     * @param {WeeklyScheduleUpsertArgs} args - Arguments to update or create a WeeklySchedule.
     * @example
     * // Update or create a WeeklySchedule
     * const weeklySchedule = await prisma.weeklySchedule.upsert({
     *   create: {
     *     // ... data to create a WeeklySchedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WeeklySchedule we want to update
     *   }
     * })
     */
    upsert<T extends WeeklyScheduleUpsertArgs>(args: SelectSubset<T, WeeklyScheduleUpsertArgs<ExtArgs>>): Prisma__WeeklyScheduleClient<$Result.GetResult<Prisma.$WeeklySchedulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WeeklySchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyScheduleCountArgs} args - Arguments to filter WeeklySchedules to count.
     * @example
     * // Count the number of WeeklySchedules
     * const count = await prisma.weeklySchedule.count({
     *   where: {
     *     // ... the filter for the WeeklySchedules we want to count
     *   }
     * })
    **/
    count<T extends WeeklyScheduleCountArgs>(
      args?: Subset<T, WeeklyScheduleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WeeklyScheduleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WeeklySchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WeeklyScheduleAggregateArgs>(args: Subset<T, WeeklyScheduleAggregateArgs>): Prisma.PrismaPromise<GetWeeklyScheduleAggregateType<T>>

    /**
     * Group by WeeklySchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyScheduleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WeeklyScheduleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WeeklyScheduleGroupByArgs['orderBy'] }
        : { orderBy?: WeeklyScheduleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WeeklyScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWeeklyScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WeeklySchedule model
   */
  readonly fields: WeeklyScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WeeklySchedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WeeklyScheduleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    church<T extends ChurchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChurchDefaultArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WeeklySchedule model
   */
  interface WeeklyScheduleFieldRefs {
    readonly id: FieldRef<"WeeklySchedule", 'String'>
    readonly title: FieldRef<"WeeklySchedule", 'String'>
    readonly dayOfWeek: FieldRef<"WeeklySchedule", 'DayOfWeek'>
    readonly time: FieldRef<"WeeklySchedule", 'String'>
    readonly description: FieldRef<"WeeklySchedule", 'String'>
    readonly active: FieldRef<"WeeklySchedule", 'Boolean'>
    readonly churchId: FieldRef<"WeeklySchedule", 'String'>
    readonly createdAt: FieldRef<"WeeklySchedule", 'DateTime'>
    readonly updatedAt: FieldRef<"WeeklySchedule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WeeklySchedule findUnique
   */
  export type WeeklyScheduleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklySchedule
     */
    select?: WeeklyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklySchedule
     */
    omit?: WeeklyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyScheduleInclude<ExtArgs> | null
    /**
     * Filter, which WeeklySchedule to fetch.
     */
    where: WeeklyScheduleWhereUniqueInput
  }

  /**
   * WeeklySchedule findUniqueOrThrow
   */
  export type WeeklyScheduleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklySchedule
     */
    select?: WeeklyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklySchedule
     */
    omit?: WeeklyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyScheduleInclude<ExtArgs> | null
    /**
     * Filter, which WeeklySchedule to fetch.
     */
    where: WeeklyScheduleWhereUniqueInput
  }

  /**
   * WeeklySchedule findFirst
   */
  export type WeeklyScheduleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklySchedule
     */
    select?: WeeklyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklySchedule
     */
    omit?: WeeklyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyScheduleInclude<ExtArgs> | null
    /**
     * Filter, which WeeklySchedule to fetch.
     */
    where?: WeeklyScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklySchedules to fetch.
     */
    orderBy?: WeeklyScheduleOrderByWithRelationInput | WeeklyScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeeklySchedules.
     */
    cursor?: WeeklyScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklySchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklySchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeeklySchedules.
     */
    distinct?: WeeklyScheduleScalarFieldEnum | WeeklyScheduleScalarFieldEnum[]
  }

  /**
   * WeeklySchedule findFirstOrThrow
   */
  export type WeeklyScheduleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklySchedule
     */
    select?: WeeklyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklySchedule
     */
    omit?: WeeklyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyScheduleInclude<ExtArgs> | null
    /**
     * Filter, which WeeklySchedule to fetch.
     */
    where?: WeeklyScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklySchedules to fetch.
     */
    orderBy?: WeeklyScheduleOrderByWithRelationInput | WeeklyScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeeklySchedules.
     */
    cursor?: WeeklyScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklySchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklySchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeeklySchedules.
     */
    distinct?: WeeklyScheduleScalarFieldEnum | WeeklyScheduleScalarFieldEnum[]
  }

  /**
   * WeeklySchedule findMany
   */
  export type WeeklyScheduleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklySchedule
     */
    select?: WeeklyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklySchedule
     */
    omit?: WeeklyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyScheduleInclude<ExtArgs> | null
    /**
     * Filter, which WeeklySchedules to fetch.
     */
    where?: WeeklyScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklySchedules to fetch.
     */
    orderBy?: WeeklyScheduleOrderByWithRelationInput | WeeklyScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WeeklySchedules.
     */
    cursor?: WeeklyScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklySchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklySchedules.
     */
    skip?: number
    distinct?: WeeklyScheduleScalarFieldEnum | WeeklyScheduleScalarFieldEnum[]
  }

  /**
   * WeeklySchedule create
   */
  export type WeeklyScheduleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklySchedule
     */
    select?: WeeklyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklySchedule
     */
    omit?: WeeklyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyScheduleInclude<ExtArgs> | null
    /**
     * The data needed to create a WeeklySchedule.
     */
    data: XOR<WeeklyScheduleCreateInput, WeeklyScheduleUncheckedCreateInput>
  }

  /**
   * WeeklySchedule createMany
   */
  export type WeeklyScheduleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WeeklySchedules.
     */
    data: WeeklyScheduleCreateManyInput | WeeklyScheduleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WeeklySchedule createManyAndReturn
   */
  export type WeeklyScheduleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklySchedule
     */
    select?: WeeklyScheduleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklySchedule
     */
    omit?: WeeklyScheduleOmit<ExtArgs> | null
    /**
     * The data used to create many WeeklySchedules.
     */
    data: WeeklyScheduleCreateManyInput | WeeklyScheduleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyScheduleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeeklySchedule update
   */
  export type WeeklyScheduleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklySchedule
     */
    select?: WeeklyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklySchedule
     */
    omit?: WeeklyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyScheduleInclude<ExtArgs> | null
    /**
     * The data needed to update a WeeklySchedule.
     */
    data: XOR<WeeklyScheduleUpdateInput, WeeklyScheduleUncheckedUpdateInput>
    /**
     * Choose, which WeeklySchedule to update.
     */
    where: WeeklyScheduleWhereUniqueInput
  }

  /**
   * WeeklySchedule updateMany
   */
  export type WeeklyScheduleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WeeklySchedules.
     */
    data: XOR<WeeklyScheduleUpdateManyMutationInput, WeeklyScheduleUncheckedUpdateManyInput>
    /**
     * Filter which WeeklySchedules to update
     */
    where?: WeeklyScheduleWhereInput
    /**
     * Limit how many WeeklySchedules to update.
     */
    limit?: number
  }

  /**
   * WeeklySchedule updateManyAndReturn
   */
  export type WeeklyScheduleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklySchedule
     */
    select?: WeeklyScheduleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklySchedule
     */
    omit?: WeeklyScheduleOmit<ExtArgs> | null
    /**
     * The data used to update WeeklySchedules.
     */
    data: XOR<WeeklyScheduleUpdateManyMutationInput, WeeklyScheduleUncheckedUpdateManyInput>
    /**
     * Filter which WeeklySchedules to update
     */
    where?: WeeklyScheduleWhereInput
    /**
     * Limit how many WeeklySchedules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyScheduleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeeklySchedule upsert
   */
  export type WeeklyScheduleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklySchedule
     */
    select?: WeeklyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklySchedule
     */
    omit?: WeeklyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyScheduleInclude<ExtArgs> | null
    /**
     * The filter to search for the WeeklySchedule to update in case it exists.
     */
    where: WeeklyScheduleWhereUniqueInput
    /**
     * In case the WeeklySchedule found by the `where` argument doesn't exist, create a new WeeklySchedule with this data.
     */
    create: XOR<WeeklyScheduleCreateInput, WeeklyScheduleUncheckedCreateInput>
    /**
     * In case the WeeklySchedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WeeklyScheduleUpdateInput, WeeklyScheduleUncheckedUpdateInput>
  }

  /**
   * WeeklySchedule delete
   */
  export type WeeklyScheduleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklySchedule
     */
    select?: WeeklyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklySchedule
     */
    omit?: WeeklyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyScheduleInclude<ExtArgs> | null
    /**
     * Filter which WeeklySchedule to delete.
     */
    where: WeeklyScheduleWhereUniqueInput
  }

  /**
   * WeeklySchedule deleteMany
   */
  export type WeeklyScheduleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeeklySchedules to delete
     */
    where?: WeeklyScheduleWhereInput
    /**
     * Limit how many WeeklySchedules to delete.
     */
    limit?: number
  }

  /**
   * WeeklySchedule without action
   */
  export type WeeklyScheduleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklySchedule
     */
    select?: WeeklyScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklySchedule
     */
    omit?: WeeklyScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyScheduleInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    role: $Enums.SystemRole | null
    status: $Enums.TypePerson | null
    churchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    role: $Enums.SystemRole | null
    status: $Enums.TypePerson | null
    churchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    role: number
    status: number
    churchId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    status?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    status?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    status?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    role: $Enums.SystemRole
    status: $Enums.TypePerson | null
    churchId: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    status?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    youChurch?: boolean | User$youChurchArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    status?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    youChurch?: boolean | User$youChurchArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    status?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    youChurch?: boolean | User$youChurchArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    status?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "role" | "status" | "churchId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    youChurch?: boolean | User$youChurchArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    youChurch?: boolean | User$youChurchArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    youChurch?: boolean | User$youChurchArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      youChurch: Prisma.$ChurchPayload<ExtArgs> | null
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      emailVerified: boolean
      image: string | null
      role: $Enums.SystemRole
      status: $Enums.TypePerson | null
      churchId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    youChurch<T extends User$youChurchArgs<ExtArgs> = {}>(args?: Subset<T, User$youChurchArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'SystemRole'>
    readonly status: FieldRef<"User", 'TypePerson'>
    readonly churchId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.youChurch
   */
  export type User$youChurchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Church
     */
    select?: ChurchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Church
     */
    omit?: ChurchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChurchInclude<ExtArgs> | null
    where?: ChurchWhereInput
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Person
   */

  export type AggregatePerson = {
    _count: PersonCountAggregateOutputType | null
    _min: PersonMinAggregateOutputType | null
    _max: PersonMaxAggregateOutputType | null
  }

  export type PersonMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    address: string | null
    birthday: string | null
    type: $Enums.TypePerson | null
    profileImage: string | null
    ministry: string | null
    role: string | null
    notes: string | null
    firstVisitAt: Date | null
    onboardingCompletedAt: Date | null
    churchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PersonMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    address: string | null
    birthday: string | null
    type: $Enums.TypePerson | null
    profileImage: string | null
    ministry: string | null
    role: string | null
    notes: string | null
    firstVisitAt: Date | null
    onboardingCompletedAt: Date | null
    churchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PersonCountAggregateOutputType = {
    id: number
    name: number
    email: number
    contact: number
    address: number
    birthday: number
    type: number
    profileImage: number
    ministry: number
    role: number
    notes: number
    firstVisitAt: number
    onboardingDraft: number
    onboardingCompletedAt: number
    churchId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PersonMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    address?: true
    birthday?: true
    type?: true
    profileImage?: true
    ministry?: true
    role?: true
    notes?: true
    firstVisitAt?: true
    onboardingCompletedAt?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PersonMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    address?: true
    birthday?: true
    type?: true
    profileImage?: true
    ministry?: true
    role?: true
    notes?: true
    firstVisitAt?: true
    onboardingCompletedAt?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PersonCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    contact?: true
    address?: true
    birthday?: true
    type?: true
    profileImage?: true
    ministry?: true
    role?: true
    notes?: true
    firstVisitAt?: true
    onboardingDraft?: true
    onboardingCompletedAt?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PersonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Person to aggregate.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned People
    **/
    _count?: true | PersonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PersonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PersonMaxAggregateInputType
  }

  export type GetPersonAggregateType<T extends PersonAggregateArgs> = {
        [P in keyof T & keyof AggregatePerson]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePerson[P]>
      : GetScalarType<T[P], AggregatePerson[P]>
  }




  export type PersonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonWhereInput
    orderBy?: PersonOrderByWithAggregationInput | PersonOrderByWithAggregationInput[]
    by: PersonScalarFieldEnum[] | PersonScalarFieldEnum
    having?: PersonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PersonCountAggregateInputType | true
    _min?: PersonMinAggregateInputType
    _max?: PersonMaxAggregateInputType
  }

  export type PersonGroupByOutputType = {
    id: string
    name: string
    email: string | null
    contact: string[]
    address: string | null
    birthday: string | null
    type: $Enums.TypePerson
    profileImage: string | null
    ministry: string | null
    role: string | null
    notes: string | null
    firstVisitAt: Date | null
    onboardingDraft: JsonValue | null
    onboardingCompletedAt: Date | null
    churchId: string
    createdAt: Date
    updatedAt: Date
    _count: PersonCountAggregateOutputType | null
    _min: PersonMinAggregateOutputType | null
    _max: PersonMaxAggregateOutputType | null
  }

  type GetPersonGroupByPayload<T extends PersonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PersonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PersonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PersonGroupByOutputType[P]>
            : GetScalarType<T[P], PersonGroupByOutputType[P]>
        }
      >
    >


  export type PersonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    contact?: boolean
    address?: boolean
    birthday?: boolean
    type?: boolean
    profileImage?: boolean
    ministry?: boolean
    role?: boolean
    notes?: boolean
    firstVisitAt?: boolean
    onboardingDraft?: boolean
    onboardingCompletedAt?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    youChurch?: boolean | ChurchDefaultArgs<ExtArgs>
    volunteerScales?: boolean | Person$volunteerScalesArgs<ExtArgs>
    _count?: boolean | PersonCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["person"]>

  export type PersonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    contact?: boolean
    address?: boolean
    birthday?: boolean
    type?: boolean
    profileImage?: boolean
    ministry?: boolean
    role?: boolean
    notes?: boolean
    firstVisitAt?: boolean
    onboardingDraft?: boolean
    onboardingCompletedAt?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    youChurch?: boolean | ChurchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["person"]>

  export type PersonSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    contact?: boolean
    address?: boolean
    birthday?: boolean
    type?: boolean
    profileImage?: boolean
    ministry?: boolean
    role?: boolean
    notes?: boolean
    firstVisitAt?: boolean
    onboardingDraft?: boolean
    onboardingCompletedAt?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    youChurch?: boolean | ChurchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["person"]>

  export type PersonSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    contact?: boolean
    address?: boolean
    birthday?: boolean
    type?: boolean
    profileImage?: boolean
    ministry?: boolean
    role?: boolean
    notes?: boolean
    firstVisitAt?: boolean
    onboardingDraft?: boolean
    onboardingCompletedAt?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PersonOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "contact" | "address" | "birthday" | "type" | "profileImage" | "ministry" | "role" | "notes" | "firstVisitAt" | "onboardingDraft" | "onboardingCompletedAt" | "churchId" | "createdAt" | "updatedAt", ExtArgs["result"]["person"]>
  export type PersonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    youChurch?: boolean | ChurchDefaultArgs<ExtArgs>
    volunteerScales?: boolean | Person$volunteerScalesArgs<ExtArgs>
    _count?: boolean | PersonCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PersonIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    youChurch?: boolean | ChurchDefaultArgs<ExtArgs>
  }
  export type PersonIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    youChurch?: boolean | ChurchDefaultArgs<ExtArgs>
  }

  export type $PersonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Person"
    objects: {
      youChurch: Prisma.$ChurchPayload<ExtArgs>
      volunteerScales: Prisma.$VolunteerScalePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string | null
      contact: string[]
      address: string | null
      birthday: string | null
      type: $Enums.TypePerson
      profileImage: string | null
      ministry: string | null
      role: string | null
      notes: string | null
      firstVisitAt: Date | null
      onboardingDraft: Prisma.JsonValue | null
      onboardingCompletedAt: Date | null
      churchId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["person"]>
    composites: {}
  }

  type PersonGetPayload<S extends boolean | null | undefined | PersonDefaultArgs> = $Result.GetResult<Prisma.$PersonPayload, S>

  type PersonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PersonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PersonCountAggregateInputType | true
    }

  export interface PersonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Person'], meta: { name: 'Person' } }
    /**
     * Find zero or one Person that matches the filter.
     * @param {PersonFindUniqueArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PersonFindUniqueArgs>(args: SelectSubset<T, PersonFindUniqueArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Person that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PersonFindUniqueOrThrowArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PersonFindUniqueOrThrowArgs>(args: SelectSubset<T, PersonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Person that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindFirstArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PersonFindFirstArgs>(args?: SelectSubset<T, PersonFindFirstArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Person that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindFirstOrThrowArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PersonFindFirstOrThrowArgs>(args?: SelectSubset<T, PersonFindFirstOrThrowArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more People that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all People
     * const people = await prisma.person.findMany()
     * 
     * // Get first 10 People
     * const people = await prisma.person.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const personWithIdOnly = await prisma.person.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PersonFindManyArgs>(args?: SelectSubset<T, PersonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Person.
     * @param {PersonCreateArgs} args - Arguments to create a Person.
     * @example
     * // Create one Person
     * const Person = await prisma.person.create({
     *   data: {
     *     // ... data to create a Person
     *   }
     * })
     * 
     */
    create<T extends PersonCreateArgs>(args: SelectSubset<T, PersonCreateArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many People.
     * @param {PersonCreateManyArgs} args - Arguments to create many People.
     * @example
     * // Create many People
     * const person = await prisma.person.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PersonCreateManyArgs>(args?: SelectSubset<T, PersonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many People and returns the data saved in the database.
     * @param {PersonCreateManyAndReturnArgs} args - Arguments to create many People.
     * @example
     * // Create many People
     * const person = await prisma.person.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many People and only return the `id`
     * const personWithIdOnly = await prisma.person.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PersonCreateManyAndReturnArgs>(args?: SelectSubset<T, PersonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Person.
     * @param {PersonDeleteArgs} args - Arguments to delete one Person.
     * @example
     * // Delete one Person
     * const Person = await prisma.person.delete({
     *   where: {
     *     // ... filter to delete one Person
     *   }
     * })
     * 
     */
    delete<T extends PersonDeleteArgs>(args: SelectSubset<T, PersonDeleteArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Person.
     * @param {PersonUpdateArgs} args - Arguments to update one Person.
     * @example
     * // Update one Person
     * const person = await prisma.person.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PersonUpdateArgs>(args: SelectSubset<T, PersonUpdateArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more People.
     * @param {PersonDeleteManyArgs} args - Arguments to filter People to delete.
     * @example
     * // Delete a few People
     * const { count } = await prisma.person.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PersonDeleteManyArgs>(args?: SelectSubset<T, PersonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more People.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many People
     * const person = await prisma.person.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PersonUpdateManyArgs>(args: SelectSubset<T, PersonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more People and returns the data updated in the database.
     * @param {PersonUpdateManyAndReturnArgs} args - Arguments to update many People.
     * @example
     * // Update many People
     * const person = await prisma.person.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more People and only return the `id`
     * const personWithIdOnly = await prisma.person.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PersonUpdateManyAndReturnArgs>(args: SelectSubset<T, PersonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Person.
     * @param {PersonUpsertArgs} args - Arguments to update or create a Person.
     * @example
     * // Update or create a Person
     * const person = await prisma.person.upsert({
     *   create: {
     *     // ... data to create a Person
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Person we want to update
     *   }
     * })
     */
    upsert<T extends PersonUpsertArgs>(args: SelectSubset<T, PersonUpsertArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of People.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonCountArgs} args - Arguments to filter People to count.
     * @example
     * // Count the number of People
     * const count = await prisma.person.count({
     *   where: {
     *     // ... the filter for the People we want to count
     *   }
     * })
    **/
    count<T extends PersonCountArgs>(
      args?: Subset<T, PersonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PersonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Person.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PersonAggregateArgs>(args: Subset<T, PersonAggregateArgs>): Prisma.PrismaPromise<GetPersonAggregateType<T>>

    /**
     * Group by Person.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PersonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PersonGroupByArgs['orderBy'] }
        : { orderBy?: PersonGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PersonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Person model
   */
  readonly fields: PersonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Person.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PersonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    youChurch<T extends ChurchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChurchDefaultArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    volunteerScales<T extends Person$volunteerScalesArgs<ExtArgs> = {}>(args?: Subset<T, Person$volunteerScalesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VolunteerScalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Person model
   */
  interface PersonFieldRefs {
    readonly id: FieldRef<"Person", 'String'>
    readonly name: FieldRef<"Person", 'String'>
    readonly email: FieldRef<"Person", 'String'>
    readonly contact: FieldRef<"Person", 'String[]'>
    readonly address: FieldRef<"Person", 'String'>
    readonly birthday: FieldRef<"Person", 'String'>
    readonly type: FieldRef<"Person", 'TypePerson'>
    readonly profileImage: FieldRef<"Person", 'String'>
    readonly ministry: FieldRef<"Person", 'String'>
    readonly role: FieldRef<"Person", 'String'>
    readonly notes: FieldRef<"Person", 'String'>
    readonly firstVisitAt: FieldRef<"Person", 'DateTime'>
    readonly onboardingDraft: FieldRef<"Person", 'Json'>
    readonly onboardingCompletedAt: FieldRef<"Person", 'DateTime'>
    readonly churchId: FieldRef<"Person", 'String'>
    readonly createdAt: FieldRef<"Person", 'DateTime'>
    readonly updatedAt: FieldRef<"Person", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Person findUnique
   */
  export type PersonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person findUniqueOrThrow
   */
  export type PersonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person findFirst
   */
  export type PersonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for People.
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of People.
     */
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Person findFirstOrThrow
   */
  export type PersonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for People.
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of People.
     */
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Person findMany
   */
  export type PersonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which People to fetch.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing People.
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Person create
   */
  export type PersonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * The data needed to create a Person.
     */
    data: XOR<PersonCreateInput, PersonUncheckedCreateInput>
  }

  /**
   * Person createMany
   */
  export type PersonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many People.
     */
    data: PersonCreateManyInput | PersonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Person createManyAndReturn
   */
  export type PersonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * The data used to create many People.
     */
    data: PersonCreateManyInput | PersonCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Person update
   */
  export type PersonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * The data needed to update a Person.
     */
    data: XOR<PersonUpdateInput, PersonUncheckedUpdateInput>
    /**
     * Choose, which Person to update.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person updateMany
   */
  export type PersonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update People.
     */
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyInput>
    /**
     * Filter which People to update
     */
    where?: PersonWhereInput
    /**
     * Limit how many People to update.
     */
    limit?: number
  }

  /**
   * Person updateManyAndReturn
   */
  export type PersonUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * The data used to update People.
     */
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyInput>
    /**
     * Filter which People to update
     */
    where?: PersonWhereInput
    /**
     * Limit how many People to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Person upsert
   */
  export type PersonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * The filter to search for the Person to update in case it exists.
     */
    where: PersonWhereUniqueInput
    /**
     * In case the Person found by the `where` argument doesn't exist, create a new Person with this data.
     */
    create: XOR<PersonCreateInput, PersonUncheckedCreateInput>
    /**
     * In case the Person was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PersonUpdateInput, PersonUncheckedUpdateInput>
  }

  /**
   * Person delete
   */
  export type PersonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter which Person to delete.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person deleteMany
   */
  export type PersonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which People to delete
     */
    where?: PersonWhereInput
    /**
     * Limit how many People to delete.
     */
    limit?: number
  }

  /**
   * Person.volunteerScales
   */
  export type Person$volunteerScalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerScale
     */
    select?: VolunteerScaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerScale
     */
    omit?: VolunteerScaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerScaleInclude<ExtArgs> | null
    where?: VolunteerScaleWhereInput
    orderBy?: VolunteerScaleOrderByWithRelationInput | VolunteerScaleOrderByWithRelationInput[]
    cursor?: VolunteerScaleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VolunteerScaleScalarFieldEnum | VolunteerScaleScalarFieldEnum[]
  }

  /**
   * Person without action
   */
  export type PersonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
  }


  /**
   * Model Ministry
   */

  export type AggregateMinistry = {
    _count: MinistryCountAggregateOutputType | null
    _min: MinistryMinAggregateOutputType | null
    _max: MinistryMaxAggregateOutputType | null
  }

  export type MinistryMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    icon: string | null
    color: string | null
    churchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MinistryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    icon: string | null
    color: string | null
    churchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MinistryCountAggregateOutputType = {
    id: number
    name: number
    description: number
    icon: number
    color: number
    churchId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MinistryMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    icon?: true
    color?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MinistryMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    icon?: true
    color?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MinistryCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    icon?: true
    color?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MinistryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ministry to aggregate.
     */
    where?: MinistryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ministries to fetch.
     */
    orderBy?: MinistryOrderByWithRelationInput | MinistryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MinistryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ministries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ministries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ministries
    **/
    _count?: true | MinistryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MinistryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MinistryMaxAggregateInputType
  }

  export type GetMinistryAggregateType<T extends MinistryAggregateArgs> = {
        [P in keyof T & keyof AggregateMinistry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMinistry[P]>
      : GetScalarType<T[P], AggregateMinistry[P]>
  }




  export type MinistryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MinistryWhereInput
    orderBy?: MinistryOrderByWithAggregationInput | MinistryOrderByWithAggregationInput[]
    by: MinistryScalarFieldEnum[] | MinistryScalarFieldEnum
    having?: MinistryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MinistryCountAggregateInputType | true
    _min?: MinistryMinAggregateInputType
    _max?: MinistryMaxAggregateInputType
  }

  export type MinistryGroupByOutputType = {
    id: string
    name: string
    description: string | null
    icon: string | null
    color: string | null
    churchId: string
    createdAt: Date
    updatedAt: Date
    _count: MinistryCountAggregateOutputType | null
    _min: MinistryMinAggregateOutputType | null
    _max: MinistryMaxAggregateOutputType | null
  }

  type GetMinistryGroupByPayload<T extends MinistryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MinistryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MinistryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MinistryGroupByOutputType[P]>
            : GetScalarType<T[P], MinistryGroupByOutputType[P]>
        }
      >
    >


  export type MinistrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    icon?: boolean
    color?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    church?: boolean | ChurchDefaultArgs<ExtArgs>
    scales?: boolean | Ministry$scalesArgs<ExtArgs>
    _count?: boolean | MinistryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ministry"]>

  export type MinistrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    icon?: boolean
    color?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ministry"]>

  export type MinistrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    icon?: boolean
    color?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ministry"]>

  export type MinistrySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    icon?: boolean
    color?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MinistryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "icon" | "color" | "churchId" | "createdAt" | "updatedAt", ExtArgs["result"]["ministry"]>
  export type MinistryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    church?: boolean | ChurchDefaultArgs<ExtArgs>
    scales?: boolean | Ministry$scalesArgs<ExtArgs>
    _count?: boolean | MinistryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MinistryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }
  export type MinistryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }

  export type $MinistryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ministry"
    objects: {
      church: Prisma.$ChurchPayload<ExtArgs>
      scales: Prisma.$VolunteerScalePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      icon: string | null
      color: string | null
      churchId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ministry"]>
    composites: {}
  }

  type MinistryGetPayload<S extends boolean | null | undefined | MinistryDefaultArgs> = $Result.GetResult<Prisma.$MinistryPayload, S>

  type MinistryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MinistryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MinistryCountAggregateInputType | true
    }

  export interface MinistryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ministry'], meta: { name: 'Ministry' } }
    /**
     * Find zero or one Ministry that matches the filter.
     * @param {MinistryFindUniqueArgs} args - Arguments to find a Ministry
     * @example
     * // Get one Ministry
     * const ministry = await prisma.ministry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MinistryFindUniqueArgs>(args: SelectSubset<T, MinistryFindUniqueArgs<ExtArgs>>): Prisma__MinistryClient<$Result.GetResult<Prisma.$MinistryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ministry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MinistryFindUniqueOrThrowArgs} args - Arguments to find a Ministry
     * @example
     * // Get one Ministry
     * const ministry = await prisma.ministry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MinistryFindUniqueOrThrowArgs>(args: SelectSubset<T, MinistryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MinistryClient<$Result.GetResult<Prisma.$MinistryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ministry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinistryFindFirstArgs} args - Arguments to find a Ministry
     * @example
     * // Get one Ministry
     * const ministry = await prisma.ministry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MinistryFindFirstArgs>(args?: SelectSubset<T, MinistryFindFirstArgs<ExtArgs>>): Prisma__MinistryClient<$Result.GetResult<Prisma.$MinistryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ministry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinistryFindFirstOrThrowArgs} args - Arguments to find a Ministry
     * @example
     * // Get one Ministry
     * const ministry = await prisma.ministry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MinistryFindFirstOrThrowArgs>(args?: SelectSubset<T, MinistryFindFirstOrThrowArgs<ExtArgs>>): Prisma__MinistryClient<$Result.GetResult<Prisma.$MinistryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ministries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinistryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ministries
     * const ministries = await prisma.ministry.findMany()
     * 
     * // Get first 10 Ministries
     * const ministries = await prisma.ministry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ministryWithIdOnly = await prisma.ministry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MinistryFindManyArgs>(args?: SelectSubset<T, MinistryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MinistryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ministry.
     * @param {MinistryCreateArgs} args - Arguments to create a Ministry.
     * @example
     * // Create one Ministry
     * const Ministry = await prisma.ministry.create({
     *   data: {
     *     // ... data to create a Ministry
     *   }
     * })
     * 
     */
    create<T extends MinistryCreateArgs>(args: SelectSubset<T, MinistryCreateArgs<ExtArgs>>): Prisma__MinistryClient<$Result.GetResult<Prisma.$MinistryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ministries.
     * @param {MinistryCreateManyArgs} args - Arguments to create many Ministries.
     * @example
     * // Create many Ministries
     * const ministry = await prisma.ministry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MinistryCreateManyArgs>(args?: SelectSubset<T, MinistryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ministries and returns the data saved in the database.
     * @param {MinistryCreateManyAndReturnArgs} args - Arguments to create many Ministries.
     * @example
     * // Create many Ministries
     * const ministry = await prisma.ministry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ministries and only return the `id`
     * const ministryWithIdOnly = await prisma.ministry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MinistryCreateManyAndReturnArgs>(args?: SelectSubset<T, MinistryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MinistryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ministry.
     * @param {MinistryDeleteArgs} args - Arguments to delete one Ministry.
     * @example
     * // Delete one Ministry
     * const Ministry = await prisma.ministry.delete({
     *   where: {
     *     // ... filter to delete one Ministry
     *   }
     * })
     * 
     */
    delete<T extends MinistryDeleteArgs>(args: SelectSubset<T, MinistryDeleteArgs<ExtArgs>>): Prisma__MinistryClient<$Result.GetResult<Prisma.$MinistryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ministry.
     * @param {MinistryUpdateArgs} args - Arguments to update one Ministry.
     * @example
     * // Update one Ministry
     * const ministry = await prisma.ministry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MinistryUpdateArgs>(args: SelectSubset<T, MinistryUpdateArgs<ExtArgs>>): Prisma__MinistryClient<$Result.GetResult<Prisma.$MinistryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ministries.
     * @param {MinistryDeleteManyArgs} args - Arguments to filter Ministries to delete.
     * @example
     * // Delete a few Ministries
     * const { count } = await prisma.ministry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MinistryDeleteManyArgs>(args?: SelectSubset<T, MinistryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ministries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinistryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ministries
     * const ministry = await prisma.ministry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MinistryUpdateManyArgs>(args: SelectSubset<T, MinistryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ministries and returns the data updated in the database.
     * @param {MinistryUpdateManyAndReturnArgs} args - Arguments to update many Ministries.
     * @example
     * // Update many Ministries
     * const ministry = await prisma.ministry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ministries and only return the `id`
     * const ministryWithIdOnly = await prisma.ministry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MinistryUpdateManyAndReturnArgs>(args: SelectSubset<T, MinistryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MinistryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ministry.
     * @param {MinistryUpsertArgs} args - Arguments to update or create a Ministry.
     * @example
     * // Update or create a Ministry
     * const ministry = await prisma.ministry.upsert({
     *   create: {
     *     // ... data to create a Ministry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ministry we want to update
     *   }
     * })
     */
    upsert<T extends MinistryUpsertArgs>(args: SelectSubset<T, MinistryUpsertArgs<ExtArgs>>): Prisma__MinistryClient<$Result.GetResult<Prisma.$MinistryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ministries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinistryCountArgs} args - Arguments to filter Ministries to count.
     * @example
     * // Count the number of Ministries
     * const count = await prisma.ministry.count({
     *   where: {
     *     // ... the filter for the Ministries we want to count
     *   }
     * })
    **/
    count<T extends MinistryCountArgs>(
      args?: Subset<T, MinistryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MinistryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ministry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinistryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MinistryAggregateArgs>(args: Subset<T, MinistryAggregateArgs>): Prisma.PrismaPromise<GetMinistryAggregateType<T>>

    /**
     * Group by Ministry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinistryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MinistryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MinistryGroupByArgs['orderBy'] }
        : { orderBy?: MinistryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MinistryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMinistryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ministry model
   */
  readonly fields: MinistryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ministry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MinistryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    church<T extends ChurchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChurchDefaultArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    scales<T extends Ministry$scalesArgs<ExtArgs> = {}>(args?: Subset<T, Ministry$scalesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VolunteerScalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Ministry model
   */
  interface MinistryFieldRefs {
    readonly id: FieldRef<"Ministry", 'String'>
    readonly name: FieldRef<"Ministry", 'String'>
    readonly description: FieldRef<"Ministry", 'String'>
    readonly icon: FieldRef<"Ministry", 'String'>
    readonly color: FieldRef<"Ministry", 'String'>
    readonly churchId: FieldRef<"Ministry", 'String'>
    readonly createdAt: FieldRef<"Ministry", 'DateTime'>
    readonly updatedAt: FieldRef<"Ministry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Ministry findUnique
   */
  export type MinistryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministry
     */
    select?: MinistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministry
     */
    omit?: MinistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinistryInclude<ExtArgs> | null
    /**
     * Filter, which Ministry to fetch.
     */
    where: MinistryWhereUniqueInput
  }

  /**
   * Ministry findUniqueOrThrow
   */
  export type MinistryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministry
     */
    select?: MinistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministry
     */
    omit?: MinistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinistryInclude<ExtArgs> | null
    /**
     * Filter, which Ministry to fetch.
     */
    where: MinistryWhereUniqueInput
  }

  /**
   * Ministry findFirst
   */
  export type MinistryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministry
     */
    select?: MinistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministry
     */
    omit?: MinistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinistryInclude<ExtArgs> | null
    /**
     * Filter, which Ministry to fetch.
     */
    where?: MinistryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ministries to fetch.
     */
    orderBy?: MinistryOrderByWithRelationInput | MinistryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ministries.
     */
    cursor?: MinistryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ministries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ministries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ministries.
     */
    distinct?: MinistryScalarFieldEnum | MinistryScalarFieldEnum[]
  }

  /**
   * Ministry findFirstOrThrow
   */
  export type MinistryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministry
     */
    select?: MinistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministry
     */
    omit?: MinistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinistryInclude<ExtArgs> | null
    /**
     * Filter, which Ministry to fetch.
     */
    where?: MinistryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ministries to fetch.
     */
    orderBy?: MinistryOrderByWithRelationInput | MinistryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ministries.
     */
    cursor?: MinistryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ministries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ministries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ministries.
     */
    distinct?: MinistryScalarFieldEnum | MinistryScalarFieldEnum[]
  }

  /**
   * Ministry findMany
   */
  export type MinistryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministry
     */
    select?: MinistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministry
     */
    omit?: MinistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinistryInclude<ExtArgs> | null
    /**
     * Filter, which Ministries to fetch.
     */
    where?: MinistryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ministries to fetch.
     */
    orderBy?: MinistryOrderByWithRelationInput | MinistryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ministries.
     */
    cursor?: MinistryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ministries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ministries.
     */
    skip?: number
    distinct?: MinistryScalarFieldEnum | MinistryScalarFieldEnum[]
  }

  /**
   * Ministry create
   */
  export type MinistryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministry
     */
    select?: MinistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministry
     */
    omit?: MinistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinistryInclude<ExtArgs> | null
    /**
     * The data needed to create a Ministry.
     */
    data: XOR<MinistryCreateInput, MinistryUncheckedCreateInput>
  }

  /**
   * Ministry createMany
   */
  export type MinistryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ministries.
     */
    data: MinistryCreateManyInput | MinistryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ministry createManyAndReturn
   */
  export type MinistryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministry
     */
    select?: MinistrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ministry
     */
    omit?: MinistryOmit<ExtArgs> | null
    /**
     * The data used to create many Ministries.
     */
    data: MinistryCreateManyInput | MinistryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinistryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ministry update
   */
  export type MinistryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministry
     */
    select?: MinistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministry
     */
    omit?: MinistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinistryInclude<ExtArgs> | null
    /**
     * The data needed to update a Ministry.
     */
    data: XOR<MinistryUpdateInput, MinistryUncheckedUpdateInput>
    /**
     * Choose, which Ministry to update.
     */
    where: MinistryWhereUniqueInput
  }

  /**
   * Ministry updateMany
   */
  export type MinistryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ministries.
     */
    data: XOR<MinistryUpdateManyMutationInput, MinistryUncheckedUpdateManyInput>
    /**
     * Filter which Ministries to update
     */
    where?: MinistryWhereInput
    /**
     * Limit how many Ministries to update.
     */
    limit?: number
  }

  /**
   * Ministry updateManyAndReturn
   */
  export type MinistryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministry
     */
    select?: MinistrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ministry
     */
    omit?: MinistryOmit<ExtArgs> | null
    /**
     * The data used to update Ministries.
     */
    data: XOR<MinistryUpdateManyMutationInput, MinistryUncheckedUpdateManyInput>
    /**
     * Filter which Ministries to update
     */
    where?: MinistryWhereInput
    /**
     * Limit how many Ministries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinistryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ministry upsert
   */
  export type MinistryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministry
     */
    select?: MinistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministry
     */
    omit?: MinistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinistryInclude<ExtArgs> | null
    /**
     * The filter to search for the Ministry to update in case it exists.
     */
    where: MinistryWhereUniqueInput
    /**
     * In case the Ministry found by the `where` argument doesn't exist, create a new Ministry with this data.
     */
    create: XOR<MinistryCreateInput, MinistryUncheckedCreateInput>
    /**
     * In case the Ministry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MinistryUpdateInput, MinistryUncheckedUpdateInput>
  }

  /**
   * Ministry delete
   */
  export type MinistryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministry
     */
    select?: MinistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministry
     */
    omit?: MinistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinistryInclude<ExtArgs> | null
    /**
     * Filter which Ministry to delete.
     */
    where: MinistryWhereUniqueInput
  }

  /**
   * Ministry deleteMany
   */
  export type MinistryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ministries to delete
     */
    where?: MinistryWhereInput
    /**
     * Limit how many Ministries to delete.
     */
    limit?: number
  }

  /**
   * Ministry.scales
   */
  export type Ministry$scalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerScale
     */
    select?: VolunteerScaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerScale
     */
    omit?: VolunteerScaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerScaleInclude<ExtArgs> | null
    where?: VolunteerScaleWhereInput
    orderBy?: VolunteerScaleOrderByWithRelationInput | VolunteerScaleOrderByWithRelationInput[]
    cursor?: VolunteerScaleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VolunteerScaleScalarFieldEnum | VolunteerScaleScalarFieldEnum[]
  }

  /**
   * Ministry without action
   */
  export type MinistryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministry
     */
    select?: MinistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministry
     */
    omit?: MinistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinistryInclude<ExtArgs> | null
  }


  /**
   * Model VolunteerScale
   */

  export type AggregateVolunteerScale = {
    _count: VolunteerScaleCountAggregateOutputType | null
    _min: VolunteerScaleMinAggregateOutputType | null
    _max: VolunteerScaleMaxAggregateOutputType | null
  }

  export type VolunteerScaleMinAggregateOutputType = {
    id: string | null
    date: Date | null
    role: string | null
    eventName: string | null
    confirmed: boolean | null
    personId: string | null
    ministryId: string | null
    churchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VolunteerScaleMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    role: string | null
    eventName: string | null
    confirmed: boolean | null
    personId: string | null
    ministryId: string | null
    churchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VolunteerScaleCountAggregateOutputType = {
    id: number
    date: number
    role: number
    eventName: number
    confirmed: number
    personId: number
    ministryId: number
    churchId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VolunteerScaleMinAggregateInputType = {
    id?: true
    date?: true
    role?: true
    eventName?: true
    confirmed?: true
    personId?: true
    ministryId?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VolunteerScaleMaxAggregateInputType = {
    id?: true
    date?: true
    role?: true
    eventName?: true
    confirmed?: true
    personId?: true
    ministryId?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VolunteerScaleCountAggregateInputType = {
    id?: true
    date?: true
    role?: true
    eventName?: true
    confirmed?: true
    personId?: true
    ministryId?: true
    churchId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VolunteerScaleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VolunteerScale to aggregate.
     */
    where?: VolunteerScaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VolunteerScales to fetch.
     */
    orderBy?: VolunteerScaleOrderByWithRelationInput | VolunteerScaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VolunteerScaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VolunteerScales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VolunteerScales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VolunteerScales
    **/
    _count?: true | VolunteerScaleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VolunteerScaleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VolunteerScaleMaxAggregateInputType
  }

  export type GetVolunteerScaleAggregateType<T extends VolunteerScaleAggregateArgs> = {
        [P in keyof T & keyof AggregateVolunteerScale]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVolunteerScale[P]>
      : GetScalarType<T[P], AggregateVolunteerScale[P]>
  }




  export type VolunteerScaleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VolunteerScaleWhereInput
    orderBy?: VolunteerScaleOrderByWithAggregationInput | VolunteerScaleOrderByWithAggregationInput[]
    by: VolunteerScaleScalarFieldEnum[] | VolunteerScaleScalarFieldEnum
    having?: VolunteerScaleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VolunteerScaleCountAggregateInputType | true
    _min?: VolunteerScaleMinAggregateInputType
    _max?: VolunteerScaleMaxAggregateInputType
  }

  export type VolunteerScaleGroupByOutputType = {
    id: string
    date: Date
    role: string
    eventName: string | null
    confirmed: boolean
    personId: string
    ministryId: string
    churchId: string
    createdAt: Date
    updatedAt: Date
    _count: VolunteerScaleCountAggregateOutputType | null
    _min: VolunteerScaleMinAggregateOutputType | null
    _max: VolunteerScaleMaxAggregateOutputType | null
  }

  type GetVolunteerScaleGroupByPayload<T extends VolunteerScaleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VolunteerScaleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VolunteerScaleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VolunteerScaleGroupByOutputType[P]>
            : GetScalarType<T[P], VolunteerScaleGroupByOutputType[P]>
        }
      >
    >


  export type VolunteerScaleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    role?: boolean
    eventName?: boolean
    confirmed?: boolean
    personId?: boolean
    ministryId?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    person?: boolean | PersonDefaultArgs<ExtArgs>
    ministry?: boolean | MinistryDefaultArgs<ExtArgs>
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["volunteerScale"]>

  export type VolunteerScaleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    role?: boolean
    eventName?: boolean
    confirmed?: boolean
    personId?: boolean
    ministryId?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    person?: boolean | PersonDefaultArgs<ExtArgs>
    ministry?: boolean | MinistryDefaultArgs<ExtArgs>
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["volunteerScale"]>

  export type VolunteerScaleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    role?: boolean
    eventName?: boolean
    confirmed?: boolean
    personId?: boolean
    ministryId?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    person?: boolean | PersonDefaultArgs<ExtArgs>
    ministry?: boolean | MinistryDefaultArgs<ExtArgs>
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["volunteerScale"]>

  export type VolunteerScaleSelectScalar = {
    id?: boolean
    date?: boolean
    role?: boolean
    eventName?: boolean
    confirmed?: boolean
    personId?: boolean
    ministryId?: boolean
    churchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VolunteerScaleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "role" | "eventName" | "confirmed" | "personId" | "ministryId" | "churchId" | "createdAt" | "updatedAt", ExtArgs["result"]["volunteerScale"]>
  export type VolunteerScaleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    person?: boolean | PersonDefaultArgs<ExtArgs>
    ministry?: boolean | MinistryDefaultArgs<ExtArgs>
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }
  export type VolunteerScaleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    person?: boolean | PersonDefaultArgs<ExtArgs>
    ministry?: boolean | MinistryDefaultArgs<ExtArgs>
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }
  export type VolunteerScaleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    person?: boolean | PersonDefaultArgs<ExtArgs>
    ministry?: boolean | MinistryDefaultArgs<ExtArgs>
    church?: boolean | ChurchDefaultArgs<ExtArgs>
  }

  export type $VolunteerScalePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VolunteerScale"
    objects: {
      person: Prisma.$PersonPayload<ExtArgs>
      ministry: Prisma.$MinistryPayload<ExtArgs>
      church: Prisma.$ChurchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      role: string
      eventName: string | null
      confirmed: boolean
      personId: string
      ministryId: string
      churchId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["volunteerScale"]>
    composites: {}
  }

  type VolunteerScaleGetPayload<S extends boolean | null | undefined | VolunteerScaleDefaultArgs> = $Result.GetResult<Prisma.$VolunteerScalePayload, S>

  type VolunteerScaleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VolunteerScaleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VolunteerScaleCountAggregateInputType | true
    }

  export interface VolunteerScaleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VolunteerScale'], meta: { name: 'VolunteerScale' } }
    /**
     * Find zero or one VolunteerScale that matches the filter.
     * @param {VolunteerScaleFindUniqueArgs} args - Arguments to find a VolunteerScale
     * @example
     * // Get one VolunteerScale
     * const volunteerScale = await prisma.volunteerScale.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VolunteerScaleFindUniqueArgs>(args: SelectSubset<T, VolunteerScaleFindUniqueArgs<ExtArgs>>): Prisma__VolunteerScaleClient<$Result.GetResult<Prisma.$VolunteerScalePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VolunteerScale that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VolunteerScaleFindUniqueOrThrowArgs} args - Arguments to find a VolunteerScale
     * @example
     * // Get one VolunteerScale
     * const volunteerScale = await prisma.volunteerScale.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VolunteerScaleFindUniqueOrThrowArgs>(args: SelectSubset<T, VolunteerScaleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VolunteerScaleClient<$Result.GetResult<Prisma.$VolunteerScalePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VolunteerScale that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerScaleFindFirstArgs} args - Arguments to find a VolunteerScale
     * @example
     * // Get one VolunteerScale
     * const volunteerScale = await prisma.volunteerScale.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VolunteerScaleFindFirstArgs>(args?: SelectSubset<T, VolunteerScaleFindFirstArgs<ExtArgs>>): Prisma__VolunteerScaleClient<$Result.GetResult<Prisma.$VolunteerScalePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VolunteerScale that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerScaleFindFirstOrThrowArgs} args - Arguments to find a VolunteerScale
     * @example
     * // Get one VolunteerScale
     * const volunteerScale = await prisma.volunteerScale.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VolunteerScaleFindFirstOrThrowArgs>(args?: SelectSubset<T, VolunteerScaleFindFirstOrThrowArgs<ExtArgs>>): Prisma__VolunteerScaleClient<$Result.GetResult<Prisma.$VolunteerScalePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VolunteerScales that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerScaleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VolunteerScales
     * const volunteerScales = await prisma.volunteerScale.findMany()
     * 
     * // Get first 10 VolunteerScales
     * const volunteerScales = await prisma.volunteerScale.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const volunteerScaleWithIdOnly = await prisma.volunteerScale.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VolunteerScaleFindManyArgs>(args?: SelectSubset<T, VolunteerScaleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VolunteerScalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VolunteerScale.
     * @param {VolunteerScaleCreateArgs} args - Arguments to create a VolunteerScale.
     * @example
     * // Create one VolunteerScale
     * const VolunteerScale = await prisma.volunteerScale.create({
     *   data: {
     *     // ... data to create a VolunteerScale
     *   }
     * })
     * 
     */
    create<T extends VolunteerScaleCreateArgs>(args: SelectSubset<T, VolunteerScaleCreateArgs<ExtArgs>>): Prisma__VolunteerScaleClient<$Result.GetResult<Prisma.$VolunteerScalePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VolunteerScales.
     * @param {VolunteerScaleCreateManyArgs} args - Arguments to create many VolunteerScales.
     * @example
     * // Create many VolunteerScales
     * const volunteerScale = await prisma.volunteerScale.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VolunteerScaleCreateManyArgs>(args?: SelectSubset<T, VolunteerScaleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VolunteerScales and returns the data saved in the database.
     * @param {VolunteerScaleCreateManyAndReturnArgs} args - Arguments to create many VolunteerScales.
     * @example
     * // Create many VolunteerScales
     * const volunteerScale = await prisma.volunteerScale.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VolunteerScales and only return the `id`
     * const volunteerScaleWithIdOnly = await prisma.volunteerScale.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VolunteerScaleCreateManyAndReturnArgs>(args?: SelectSubset<T, VolunteerScaleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VolunteerScalePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VolunteerScale.
     * @param {VolunteerScaleDeleteArgs} args - Arguments to delete one VolunteerScale.
     * @example
     * // Delete one VolunteerScale
     * const VolunteerScale = await prisma.volunteerScale.delete({
     *   where: {
     *     // ... filter to delete one VolunteerScale
     *   }
     * })
     * 
     */
    delete<T extends VolunteerScaleDeleteArgs>(args: SelectSubset<T, VolunteerScaleDeleteArgs<ExtArgs>>): Prisma__VolunteerScaleClient<$Result.GetResult<Prisma.$VolunteerScalePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VolunteerScale.
     * @param {VolunteerScaleUpdateArgs} args - Arguments to update one VolunteerScale.
     * @example
     * // Update one VolunteerScale
     * const volunteerScale = await prisma.volunteerScale.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VolunteerScaleUpdateArgs>(args: SelectSubset<T, VolunteerScaleUpdateArgs<ExtArgs>>): Prisma__VolunteerScaleClient<$Result.GetResult<Prisma.$VolunteerScalePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VolunteerScales.
     * @param {VolunteerScaleDeleteManyArgs} args - Arguments to filter VolunteerScales to delete.
     * @example
     * // Delete a few VolunteerScales
     * const { count } = await prisma.volunteerScale.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VolunteerScaleDeleteManyArgs>(args?: SelectSubset<T, VolunteerScaleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VolunteerScales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerScaleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VolunteerScales
     * const volunteerScale = await prisma.volunteerScale.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VolunteerScaleUpdateManyArgs>(args: SelectSubset<T, VolunteerScaleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VolunteerScales and returns the data updated in the database.
     * @param {VolunteerScaleUpdateManyAndReturnArgs} args - Arguments to update many VolunteerScales.
     * @example
     * // Update many VolunteerScales
     * const volunteerScale = await prisma.volunteerScale.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VolunteerScales and only return the `id`
     * const volunteerScaleWithIdOnly = await prisma.volunteerScale.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VolunteerScaleUpdateManyAndReturnArgs>(args: SelectSubset<T, VolunteerScaleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VolunteerScalePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VolunteerScale.
     * @param {VolunteerScaleUpsertArgs} args - Arguments to update or create a VolunteerScale.
     * @example
     * // Update or create a VolunteerScale
     * const volunteerScale = await prisma.volunteerScale.upsert({
     *   create: {
     *     // ... data to create a VolunteerScale
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VolunteerScale we want to update
     *   }
     * })
     */
    upsert<T extends VolunteerScaleUpsertArgs>(args: SelectSubset<T, VolunteerScaleUpsertArgs<ExtArgs>>): Prisma__VolunteerScaleClient<$Result.GetResult<Prisma.$VolunteerScalePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VolunteerScales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerScaleCountArgs} args - Arguments to filter VolunteerScales to count.
     * @example
     * // Count the number of VolunteerScales
     * const count = await prisma.volunteerScale.count({
     *   where: {
     *     // ... the filter for the VolunteerScales we want to count
     *   }
     * })
    **/
    count<T extends VolunteerScaleCountArgs>(
      args?: Subset<T, VolunteerScaleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VolunteerScaleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VolunteerScale.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerScaleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VolunteerScaleAggregateArgs>(args: Subset<T, VolunteerScaleAggregateArgs>): Prisma.PrismaPromise<GetVolunteerScaleAggregateType<T>>

    /**
     * Group by VolunteerScale.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerScaleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VolunteerScaleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VolunteerScaleGroupByArgs['orderBy'] }
        : { orderBy?: VolunteerScaleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VolunteerScaleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVolunteerScaleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VolunteerScale model
   */
  readonly fields: VolunteerScaleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VolunteerScale.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VolunteerScaleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    person<T extends PersonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PersonDefaultArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    ministry<T extends MinistryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MinistryDefaultArgs<ExtArgs>>): Prisma__MinistryClient<$Result.GetResult<Prisma.$MinistryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    church<T extends ChurchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChurchDefaultArgs<ExtArgs>>): Prisma__ChurchClient<$Result.GetResult<Prisma.$ChurchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VolunteerScale model
   */
  interface VolunteerScaleFieldRefs {
    readonly id: FieldRef<"VolunteerScale", 'String'>
    readonly date: FieldRef<"VolunteerScale", 'DateTime'>
    readonly role: FieldRef<"VolunteerScale", 'String'>
    readonly eventName: FieldRef<"VolunteerScale", 'String'>
    readonly confirmed: FieldRef<"VolunteerScale", 'Boolean'>
    readonly personId: FieldRef<"VolunteerScale", 'String'>
    readonly ministryId: FieldRef<"VolunteerScale", 'String'>
    readonly churchId: FieldRef<"VolunteerScale", 'String'>
    readonly createdAt: FieldRef<"VolunteerScale", 'DateTime'>
    readonly updatedAt: FieldRef<"VolunteerScale", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VolunteerScale findUnique
   */
  export type VolunteerScaleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerScale
     */
    select?: VolunteerScaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerScale
     */
    omit?: VolunteerScaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerScaleInclude<ExtArgs> | null
    /**
     * Filter, which VolunteerScale to fetch.
     */
    where: VolunteerScaleWhereUniqueInput
  }

  /**
   * VolunteerScale findUniqueOrThrow
   */
  export type VolunteerScaleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerScale
     */
    select?: VolunteerScaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerScale
     */
    omit?: VolunteerScaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerScaleInclude<ExtArgs> | null
    /**
     * Filter, which VolunteerScale to fetch.
     */
    where: VolunteerScaleWhereUniqueInput
  }

  /**
   * VolunteerScale findFirst
   */
  export type VolunteerScaleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerScale
     */
    select?: VolunteerScaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerScale
     */
    omit?: VolunteerScaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerScaleInclude<ExtArgs> | null
    /**
     * Filter, which VolunteerScale to fetch.
     */
    where?: VolunteerScaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VolunteerScales to fetch.
     */
    orderBy?: VolunteerScaleOrderByWithRelationInput | VolunteerScaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VolunteerScales.
     */
    cursor?: VolunteerScaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VolunteerScales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VolunteerScales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VolunteerScales.
     */
    distinct?: VolunteerScaleScalarFieldEnum | VolunteerScaleScalarFieldEnum[]
  }

  /**
   * VolunteerScale findFirstOrThrow
   */
  export type VolunteerScaleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerScale
     */
    select?: VolunteerScaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerScale
     */
    omit?: VolunteerScaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerScaleInclude<ExtArgs> | null
    /**
     * Filter, which VolunteerScale to fetch.
     */
    where?: VolunteerScaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VolunteerScales to fetch.
     */
    orderBy?: VolunteerScaleOrderByWithRelationInput | VolunteerScaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VolunteerScales.
     */
    cursor?: VolunteerScaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VolunteerScales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VolunteerScales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VolunteerScales.
     */
    distinct?: VolunteerScaleScalarFieldEnum | VolunteerScaleScalarFieldEnum[]
  }

  /**
   * VolunteerScale findMany
   */
  export type VolunteerScaleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerScale
     */
    select?: VolunteerScaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerScale
     */
    omit?: VolunteerScaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerScaleInclude<ExtArgs> | null
    /**
     * Filter, which VolunteerScales to fetch.
     */
    where?: VolunteerScaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VolunteerScales to fetch.
     */
    orderBy?: VolunteerScaleOrderByWithRelationInput | VolunteerScaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VolunteerScales.
     */
    cursor?: VolunteerScaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VolunteerScales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VolunteerScales.
     */
    skip?: number
    distinct?: VolunteerScaleScalarFieldEnum | VolunteerScaleScalarFieldEnum[]
  }

  /**
   * VolunteerScale create
   */
  export type VolunteerScaleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerScale
     */
    select?: VolunteerScaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerScale
     */
    omit?: VolunteerScaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerScaleInclude<ExtArgs> | null
    /**
     * The data needed to create a VolunteerScale.
     */
    data: XOR<VolunteerScaleCreateInput, VolunteerScaleUncheckedCreateInput>
  }

  /**
   * VolunteerScale createMany
   */
  export type VolunteerScaleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VolunteerScales.
     */
    data: VolunteerScaleCreateManyInput | VolunteerScaleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VolunteerScale createManyAndReturn
   */
  export type VolunteerScaleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerScale
     */
    select?: VolunteerScaleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerScale
     */
    omit?: VolunteerScaleOmit<ExtArgs> | null
    /**
     * The data used to create many VolunteerScales.
     */
    data: VolunteerScaleCreateManyInput | VolunteerScaleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerScaleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VolunteerScale update
   */
  export type VolunteerScaleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerScale
     */
    select?: VolunteerScaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerScale
     */
    omit?: VolunteerScaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerScaleInclude<ExtArgs> | null
    /**
     * The data needed to update a VolunteerScale.
     */
    data: XOR<VolunteerScaleUpdateInput, VolunteerScaleUncheckedUpdateInput>
    /**
     * Choose, which VolunteerScale to update.
     */
    where: VolunteerScaleWhereUniqueInput
  }

  /**
   * VolunteerScale updateMany
   */
  export type VolunteerScaleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VolunteerScales.
     */
    data: XOR<VolunteerScaleUpdateManyMutationInput, VolunteerScaleUncheckedUpdateManyInput>
    /**
     * Filter which VolunteerScales to update
     */
    where?: VolunteerScaleWhereInput
    /**
     * Limit how many VolunteerScales to update.
     */
    limit?: number
  }

  /**
   * VolunteerScale updateManyAndReturn
   */
  export type VolunteerScaleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerScale
     */
    select?: VolunteerScaleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerScale
     */
    omit?: VolunteerScaleOmit<ExtArgs> | null
    /**
     * The data used to update VolunteerScales.
     */
    data: XOR<VolunteerScaleUpdateManyMutationInput, VolunteerScaleUncheckedUpdateManyInput>
    /**
     * Filter which VolunteerScales to update
     */
    where?: VolunteerScaleWhereInput
    /**
     * Limit how many VolunteerScales to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerScaleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VolunteerScale upsert
   */
  export type VolunteerScaleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerScale
     */
    select?: VolunteerScaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerScale
     */
    omit?: VolunteerScaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerScaleInclude<ExtArgs> | null
    /**
     * The filter to search for the VolunteerScale to update in case it exists.
     */
    where: VolunteerScaleWhereUniqueInput
    /**
     * In case the VolunteerScale found by the `where` argument doesn't exist, create a new VolunteerScale with this data.
     */
    create: XOR<VolunteerScaleCreateInput, VolunteerScaleUncheckedCreateInput>
    /**
     * In case the VolunteerScale was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VolunteerScaleUpdateInput, VolunteerScaleUncheckedUpdateInput>
  }

  /**
   * VolunteerScale delete
   */
  export type VolunteerScaleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerScale
     */
    select?: VolunteerScaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerScale
     */
    omit?: VolunteerScaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerScaleInclude<ExtArgs> | null
    /**
     * Filter which VolunteerScale to delete.
     */
    where: VolunteerScaleWhereUniqueInput
  }

  /**
   * VolunteerScale deleteMany
   */
  export type VolunteerScaleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VolunteerScales to delete
     */
    where?: VolunteerScaleWhereInput
    /**
     * Limit how many VolunteerScales to delete.
     */
    limit?: number
  }

  /**
   * VolunteerScale without action
   */
  export type VolunteerScaleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerScale
     */
    select?: VolunteerScaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerScale
     */
    omit?: VolunteerScaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerScaleInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    userId: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent" | "userId", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
      userId: string
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly token: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Verification model
   */
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification updateManyAndReturn
   */
  export type VerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ChurchScalarFieldEnum: {
    id: 'id',
    name: 'name',
    label: 'label',
    address: 'address',
    contact: 'contact',
    customization: 'customization',
    pixKeyType: 'pixKeyType',
    pixKeyValue: 'pixKeyValue',
    pixCopyPaste: 'pixCopyPaste',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ChurchScalarFieldEnum = (typeof ChurchScalarFieldEnum)[keyof typeof ChurchScalarFieldEnum]


  export const FinancialEntryScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    category: 'category',
    type: 'type',
    date: 'date',
    donorName: 'donorName',
    description: 'description',
    churchId: 'churchId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FinancialEntryScalarFieldEnum = (typeof FinancialEntryScalarFieldEnum)[keyof typeof FinancialEntryScalarFieldEnum]


  export const ChurchLinkScalarFieldEnum: {
    id: 'id',
    title: 'title',
    url: 'url',
    icon: 'icon',
    active: 'active',
    order: 'order',
    churchId: 'churchId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ChurchLinkScalarFieldEnum = (typeof ChurchLinkScalarFieldEnum)[keyof typeof ChurchLinkScalarFieldEnum]


  export const WeeklyScheduleScalarFieldEnum: {
    id: 'id',
    title: 'title',
    dayOfWeek: 'dayOfWeek',
    time: 'time',
    description: 'description',
    active: 'active',
    churchId: 'churchId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WeeklyScheduleScalarFieldEnum = (typeof WeeklyScheduleScalarFieldEnum)[keyof typeof WeeklyScheduleScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    role: 'role',
    status: 'status',
    churchId: 'churchId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PersonScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    contact: 'contact',
    address: 'address',
    birthday: 'birthday',
    type: 'type',
    profileImage: 'profileImage',
    ministry: 'ministry',
    role: 'role',
    notes: 'notes',
    firstVisitAt: 'firstVisitAt',
    onboardingDraft: 'onboardingDraft',
    onboardingCompletedAt: 'onboardingCompletedAt',
    churchId: 'churchId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PersonScalarFieldEnum = (typeof PersonScalarFieldEnum)[keyof typeof PersonScalarFieldEnum]


  export const MinistryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    icon: 'icon',
    color: 'color',
    churchId: 'churchId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MinistryScalarFieldEnum = (typeof MinistryScalarFieldEnum)[keyof typeof MinistryScalarFieldEnum]


  export const VolunteerScaleScalarFieldEnum: {
    id: 'id',
    date: 'date',
    role: 'role',
    eventName: 'eventName',
    confirmed: 'confirmed',
    personId: 'personId',
    ministryId: 'ministryId',
    churchId: 'churchId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VolunteerScaleScalarFieldEnum = (typeof VolunteerScaleScalarFieldEnum)[keyof typeof VolunteerScaleScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'EntryType'
   */
  export type EnumEntryTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EntryType'>
    


  /**
   * Reference to a field of type 'EntryType[]'
   */
  export type ListEnumEntryTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EntryType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DayOfWeek'
   */
  export type EnumDayOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayOfWeek'>
    


  /**
   * Reference to a field of type 'DayOfWeek[]'
   */
  export type ListEnumDayOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayOfWeek[]'>
    


  /**
   * Reference to a field of type 'SystemRole'
   */
  export type EnumSystemRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SystemRole'>
    


  /**
   * Reference to a field of type 'SystemRole[]'
   */
  export type ListEnumSystemRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SystemRole[]'>
    


  /**
   * Reference to a field of type 'TypePerson'
   */
  export type EnumTypePersonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TypePerson'>
    


  /**
   * Reference to a field of type 'TypePerson[]'
   */
  export type ListEnumTypePersonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TypePerson[]'>
    
  /**
   * Deep Input Types
   */


  export type ChurchWhereInput = {
    AND?: ChurchWhereInput | ChurchWhereInput[]
    OR?: ChurchWhereInput[]
    NOT?: ChurchWhereInput | ChurchWhereInput[]
    id?: StringFilter<"Church"> | string
    name?: StringFilter<"Church"> | string
    label?: StringFilter<"Church"> | string
    address?: StringFilter<"Church"> | string
    contact?: StringNullableListFilter<"Church">
    customization?: JsonNullableFilter<"Church">
    pixKeyType?: StringNullableFilter<"Church"> | string | null
    pixKeyValue?: StringNullableFilter<"Church"> | string | null
    pixCopyPaste?: StringNullableFilter<"Church"> | string | null
    createdAt?: DateTimeFilter<"Church"> | Date | string
    updatedAt?: DateTimeFilter<"Church"> | Date | string
    users?: UserListRelationFilter
    persons?: PersonListRelationFilter
    links?: ChurchLinkListRelationFilter
    schedules?: WeeklyScheduleListRelationFilter
    ministries?: MinistryListRelationFilter
    volunteerScales?: VolunteerScaleListRelationFilter
    financialEntries?: FinancialEntryListRelationFilter
  }

  export type ChurchOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    address?: SortOrder
    contact?: SortOrder
    customization?: SortOrderInput | SortOrder
    pixKeyType?: SortOrderInput | SortOrder
    pixKeyValue?: SortOrderInput | SortOrder
    pixCopyPaste?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    persons?: PersonOrderByRelationAggregateInput
    links?: ChurchLinkOrderByRelationAggregateInput
    schedules?: WeeklyScheduleOrderByRelationAggregateInput
    ministries?: MinistryOrderByRelationAggregateInput
    volunteerScales?: VolunteerScaleOrderByRelationAggregateInput
    financialEntries?: FinancialEntryOrderByRelationAggregateInput
  }

  export type ChurchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    label?: string
    AND?: ChurchWhereInput | ChurchWhereInput[]
    OR?: ChurchWhereInput[]
    NOT?: ChurchWhereInput | ChurchWhereInput[]
    name?: StringFilter<"Church"> | string
    address?: StringFilter<"Church"> | string
    contact?: StringNullableListFilter<"Church">
    customization?: JsonNullableFilter<"Church">
    pixKeyType?: StringNullableFilter<"Church"> | string | null
    pixKeyValue?: StringNullableFilter<"Church"> | string | null
    pixCopyPaste?: StringNullableFilter<"Church"> | string | null
    createdAt?: DateTimeFilter<"Church"> | Date | string
    updatedAt?: DateTimeFilter<"Church"> | Date | string
    users?: UserListRelationFilter
    persons?: PersonListRelationFilter
    links?: ChurchLinkListRelationFilter
    schedules?: WeeklyScheduleListRelationFilter
    ministries?: MinistryListRelationFilter
    volunteerScales?: VolunteerScaleListRelationFilter
    financialEntries?: FinancialEntryListRelationFilter
  }, "id" | "label">

  export type ChurchOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    address?: SortOrder
    contact?: SortOrder
    customization?: SortOrderInput | SortOrder
    pixKeyType?: SortOrderInput | SortOrder
    pixKeyValue?: SortOrderInput | SortOrder
    pixCopyPaste?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ChurchCountOrderByAggregateInput
    _max?: ChurchMaxOrderByAggregateInput
    _min?: ChurchMinOrderByAggregateInput
  }

  export type ChurchScalarWhereWithAggregatesInput = {
    AND?: ChurchScalarWhereWithAggregatesInput | ChurchScalarWhereWithAggregatesInput[]
    OR?: ChurchScalarWhereWithAggregatesInput[]
    NOT?: ChurchScalarWhereWithAggregatesInput | ChurchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Church"> | string
    name?: StringWithAggregatesFilter<"Church"> | string
    label?: StringWithAggregatesFilter<"Church"> | string
    address?: StringWithAggregatesFilter<"Church"> | string
    contact?: StringNullableListFilter<"Church">
    customization?: JsonNullableWithAggregatesFilter<"Church">
    pixKeyType?: StringNullableWithAggregatesFilter<"Church"> | string | null
    pixKeyValue?: StringNullableWithAggregatesFilter<"Church"> | string | null
    pixCopyPaste?: StringNullableWithAggregatesFilter<"Church"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Church"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Church"> | Date | string
  }

  export type FinancialEntryWhereInput = {
    AND?: FinancialEntryWhereInput | FinancialEntryWhereInput[]
    OR?: FinancialEntryWhereInput[]
    NOT?: FinancialEntryWhereInput | FinancialEntryWhereInput[]
    id?: StringFilter<"FinancialEntry"> | string
    amount?: FloatFilter<"FinancialEntry"> | number
    category?: StringFilter<"FinancialEntry"> | string
    type?: EnumEntryTypeFilter<"FinancialEntry"> | $Enums.EntryType
    date?: DateTimeFilter<"FinancialEntry"> | Date | string
    donorName?: StringNullableFilter<"FinancialEntry"> | string | null
    description?: StringNullableFilter<"FinancialEntry"> | string | null
    churchId?: StringFilter<"FinancialEntry"> | string
    createdAt?: DateTimeFilter<"FinancialEntry"> | Date | string
    updatedAt?: DateTimeFilter<"FinancialEntry"> | Date | string
    church?: XOR<ChurchScalarRelationFilter, ChurchWhereInput>
  }

  export type FinancialEntryOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    category?: SortOrder
    type?: SortOrder
    date?: SortOrder
    donorName?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    church?: ChurchOrderByWithRelationInput
  }

  export type FinancialEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FinancialEntryWhereInput | FinancialEntryWhereInput[]
    OR?: FinancialEntryWhereInput[]
    NOT?: FinancialEntryWhereInput | FinancialEntryWhereInput[]
    amount?: FloatFilter<"FinancialEntry"> | number
    category?: StringFilter<"FinancialEntry"> | string
    type?: EnumEntryTypeFilter<"FinancialEntry"> | $Enums.EntryType
    date?: DateTimeFilter<"FinancialEntry"> | Date | string
    donorName?: StringNullableFilter<"FinancialEntry"> | string | null
    description?: StringNullableFilter<"FinancialEntry"> | string | null
    churchId?: StringFilter<"FinancialEntry"> | string
    createdAt?: DateTimeFilter<"FinancialEntry"> | Date | string
    updatedAt?: DateTimeFilter<"FinancialEntry"> | Date | string
    church?: XOR<ChurchScalarRelationFilter, ChurchWhereInput>
  }, "id">

  export type FinancialEntryOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    category?: SortOrder
    type?: SortOrder
    date?: SortOrder
    donorName?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FinancialEntryCountOrderByAggregateInput
    _avg?: FinancialEntryAvgOrderByAggregateInput
    _max?: FinancialEntryMaxOrderByAggregateInput
    _min?: FinancialEntryMinOrderByAggregateInput
    _sum?: FinancialEntrySumOrderByAggregateInput
  }

  export type FinancialEntryScalarWhereWithAggregatesInput = {
    AND?: FinancialEntryScalarWhereWithAggregatesInput | FinancialEntryScalarWhereWithAggregatesInput[]
    OR?: FinancialEntryScalarWhereWithAggregatesInput[]
    NOT?: FinancialEntryScalarWhereWithAggregatesInput | FinancialEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FinancialEntry"> | string
    amount?: FloatWithAggregatesFilter<"FinancialEntry"> | number
    category?: StringWithAggregatesFilter<"FinancialEntry"> | string
    type?: EnumEntryTypeWithAggregatesFilter<"FinancialEntry"> | $Enums.EntryType
    date?: DateTimeWithAggregatesFilter<"FinancialEntry"> | Date | string
    donorName?: StringNullableWithAggregatesFilter<"FinancialEntry"> | string | null
    description?: StringNullableWithAggregatesFilter<"FinancialEntry"> | string | null
    churchId?: StringWithAggregatesFilter<"FinancialEntry"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FinancialEntry"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FinancialEntry"> | Date | string
  }

  export type ChurchLinkWhereInput = {
    AND?: ChurchLinkWhereInput | ChurchLinkWhereInput[]
    OR?: ChurchLinkWhereInput[]
    NOT?: ChurchLinkWhereInput | ChurchLinkWhereInput[]
    id?: StringFilter<"ChurchLink"> | string
    title?: StringFilter<"ChurchLink"> | string
    url?: StringFilter<"ChurchLink"> | string
    icon?: StringNullableFilter<"ChurchLink"> | string | null
    active?: BoolFilter<"ChurchLink"> | boolean
    order?: IntFilter<"ChurchLink"> | number
    churchId?: StringFilter<"ChurchLink"> | string
    createdAt?: DateTimeFilter<"ChurchLink"> | Date | string
    updatedAt?: DateTimeFilter<"ChurchLink"> | Date | string
    church?: XOR<ChurchScalarRelationFilter, ChurchWhereInput>
  }

  export type ChurchLinkOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    icon?: SortOrderInput | SortOrder
    active?: SortOrder
    order?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    church?: ChurchOrderByWithRelationInput
  }

  export type ChurchLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChurchLinkWhereInput | ChurchLinkWhereInput[]
    OR?: ChurchLinkWhereInput[]
    NOT?: ChurchLinkWhereInput | ChurchLinkWhereInput[]
    title?: StringFilter<"ChurchLink"> | string
    url?: StringFilter<"ChurchLink"> | string
    icon?: StringNullableFilter<"ChurchLink"> | string | null
    active?: BoolFilter<"ChurchLink"> | boolean
    order?: IntFilter<"ChurchLink"> | number
    churchId?: StringFilter<"ChurchLink"> | string
    createdAt?: DateTimeFilter<"ChurchLink"> | Date | string
    updatedAt?: DateTimeFilter<"ChurchLink"> | Date | string
    church?: XOR<ChurchScalarRelationFilter, ChurchWhereInput>
  }, "id">

  export type ChurchLinkOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    icon?: SortOrderInput | SortOrder
    active?: SortOrder
    order?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ChurchLinkCountOrderByAggregateInput
    _avg?: ChurchLinkAvgOrderByAggregateInput
    _max?: ChurchLinkMaxOrderByAggregateInput
    _min?: ChurchLinkMinOrderByAggregateInput
    _sum?: ChurchLinkSumOrderByAggregateInput
  }

  export type ChurchLinkScalarWhereWithAggregatesInput = {
    AND?: ChurchLinkScalarWhereWithAggregatesInput | ChurchLinkScalarWhereWithAggregatesInput[]
    OR?: ChurchLinkScalarWhereWithAggregatesInput[]
    NOT?: ChurchLinkScalarWhereWithAggregatesInput | ChurchLinkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChurchLink"> | string
    title?: StringWithAggregatesFilter<"ChurchLink"> | string
    url?: StringWithAggregatesFilter<"ChurchLink"> | string
    icon?: StringNullableWithAggregatesFilter<"ChurchLink"> | string | null
    active?: BoolWithAggregatesFilter<"ChurchLink"> | boolean
    order?: IntWithAggregatesFilter<"ChurchLink"> | number
    churchId?: StringWithAggregatesFilter<"ChurchLink"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ChurchLink"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ChurchLink"> | Date | string
  }

  export type WeeklyScheduleWhereInput = {
    AND?: WeeklyScheduleWhereInput | WeeklyScheduleWhereInput[]
    OR?: WeeklyScheduleWhereInput[]
    NOT?: WeeklyScheduleWhereInput | WeeklyScheduleWhereInput[]
    id?: StringFilter<"WeeklySchedule"> | string
    title?: StringFilter<"WeeklySchedule"> | string
    dayOfWeek?: EnumDayOfWeekFilter<"WeeklySchedule"> | $Enums.DayOfWeek
    time?: StringFilter<"WeeklySchedule"> | string
    description?: StringNullableFilter<"WeeklySchedule"> | string | null
    active?: BoolFilter<"WeeklySchedule"> | boolean
    churchId?: StringFilter<"WeeklySchedule"> | string
    createdAt?: DateTimeFilter<"WeeklySchedule"> | Date | string
    updatedAt?: DateTimeFilter<"WeeklySchedule"> | Date | string
    church?: XOR<ChurchScalarRelationFilter, ChurchWhereInput>
  }

  export type WeeklyScheduleOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    dayOfWeek?: SortOrder
    time?: SortOrder
    description?: SortOrderInput | SortOrder
    active?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    church?: ChurchOrderByWithRelationInput
  }

  export type WeeklyScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WeeklyScheduleWhereInput | WeeklyScheduleWhereInput[]
    OR?: WeeklyScheduleWhereInput[]
    NOT?: WeeklyScheduleWhereInput | WeeklyScheduleWhereInput[]
    title?: StringFilter<"WeeklySchedule"> | string
    dayOfWeek?: EnumDayOfWeekFilter<"WeeklySchedule"> | $Enums.DayOfWeek
    time?: StringFilter<"WeeklySchedule"> | string
    description?: StringNullableFilter<"WeeklySchedule"> | string | null
    active?: BoolFilter<"WeeklySchedule"> | boolean
    churchId?: StringFilter<"WeeklySchedule"> | string
    createdAt?: DateTimeFilter<"WeeklySchedule"> | Date | string
    updatedAt?: DateTimeFilter<"WeeklySchedule"> | Date | string
    church?: XOR<ChurchScalarRelationFilter, ChurchWhereInput>
  }, "id">

  export type WeeklyScheduleOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    dayOfWeek?: SortOrder
    time?: SortOrder
    description?: SortOrderInput | SortOrder
    active?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WeeklyScheduleCountOrderByAggregateInput
    _max?: WeeklyScheduleMaxOrderByAggregateInput
    _min?: WeeklyScheduleMinOrderByAggregateInput
  }

  export type WeeklyScheduleScalarWhereWithAggregatesInput = {
    AND?: WeeklyScheduleScalarWhereWithAggregatesInput | WeeklyScheduleScalarWhereWithAggregatesInput[]
    OR?: WeeklyScheduleScalarWhereWithAggregatesInput[]
    NOT?: WeeklyScheduleScalarWhereWithAggregatesInput | WeeklyScheduleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WeeklySchedule"> | string
    title?: StringWithAggregatesFilter<"WeeklySchedule"> | string
    dayOfWeek?: EnumDayOfWeekWithAggregatesFilter<"WeeklySchedule"> | $Enums.DayOfWeek
    time?: StringWithAggregatesFilter<"WeeklySchedule"> | string
    description?: StringNullableWithAggregatesFilter<"WeeklySchedule"> | string | null
    active?: BoolWithAggregatesFilter<"WeeklySchedule"> | boolean
    churchId?: StringWithAggregatesFilter<"WeeklySchedule"> | string
    createdAt?: DateTimeWithAggregatesFilter<"WeeklySchedule"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WeeklySchedule"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumSystemRoleFilter<"User"> | $Enums.SystemRole
    status?: EnumTypePersonNullableFilter<"User"> | $Enums.TypePerson | null
    churchId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    youChurch?: XOR<ChurchNullableScalarRelationFilter, ChurchWhereInput> | null
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    status?: SortOrderInput | SortOrder
    churchId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    youChurch?: ChurchOrderByWithRelationInput
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumSystemRoleFilter<"User"> | $Enums.SystemRole
    status?: EnumTypePersonNullableFilter<"User"> | $Enums.TypePerson | null
    churchId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    youChurch?: XOR<ChurchNullableScalarRelationFilter, ChurchWhereInput> | null
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    status?: SortOrderInput | SortOrder
    churchId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumSystemRoleWithAggregatesFilter<"User"> | $Enums.SystemRole
    status?: EnumTypePersonNullableWithAggregatesFilter<"User"> | $Enums.TypePerson | null
    churchId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PersonWhereInput = {
    AND?: PersonWhereInput | PersonWhereInput[]
    OR?: PersonWhereInput[]
    NOT?: PersonWhereInput | PersonWhereInput[]
    id?: StringFilter<"Person"> | string
    name?: StringFilter<"Person"> | string
    email?: StringNullableFilter<"Person"> | string | null
    contact?: StringNullableListFilter<"Person">
    address?: StringNullableFilter<"Person"> | string | null
    birthday?: StringNullableFilter<"Person"> | string | null
    type?: EnumTypePersonFilter<"Person"> | $Enums.TypePerson
    profileImage?: StringNullableFilter<"Person"> | string | null
    ministry?: StringNullableFilter<"Person"> | string | null
    role?: StringNullableFilter<"Person"> | string | null
    notes?: StringNullableFilter<"Person"> | string | null
    firstVisitAt?: DateTimeNullableFilter<"Person"> | Date | string | null
    onboardingDraft?: JsonNullableFilter<"Person">
    onboardingCompletedAt?: DateTimeNullableFilter<"Person"> | Date | string | null
    churchId?: StringFilter<"Person"> | string
    createdAt?: DateTimeFilter<"Person"> | Date | string
    updatedAt?: DateTimeFilter<"Person"> | Date | string
    youChurch?: XOR<ChurchScalarRelationFilter, ChurchWhereInput>
    volunteerScales?: VolunteerScaleListRelationFilter
  }

  export type PersonOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    contact?: SortOrder
    address?: SortOrderInput | SortOrder
    birthday?: SortOrderInput | SortOrder
    type?: SortOrder
    profileImage?: SortOrderInput | SortOrder
    ministry?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    firstVisitAt?: SortOrderInput | SortOrder
    onboardingDraft?: SortOrderInput | SortOrder
    onboardingCompletedAt?: SortOrderInput | SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    youChurch?: ChurchOrderByWithRelationInput
    volunteerScales?: VolunteerScaleOrderByRelationAggregateInput
  }

  export type PersonWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email_churchId?: PersonEmailChurchIdCompoundUniqueInput
    AND?: PersonWhereInput | PersonWhereInput[]
    OR?: PersonWhereInput[]
    NOT?: PersonWhereInput | PersonWhereInput[]
    name?: StringFilter<"Person"> | string
    email?: StringNullableFilter<"Person"> | string | null
    contact?: StringNullableListFilter<"Person">
    address?: StringNullableFilter<"Person"> | string | null
    birthday?: StringNullableFilter<"Person"> | string | null
    type?: EnumTypePersonFilter<"Person"> | $Enums.TypePerson
    profileImage?: StringNullableFilter<"Person"> | string | null
    ministry?: StringNullableFilter<"Person"> | string | null
    role?: StringNullableFilter<"Person"> | string | null
    notes?: StringNullableFilter<"Person"> | string | null
    firstVisitAt?: DateTimeNullableFilter<"Person"> | Date | string | null
    onboardingDraft?: JsonNullableFilter<"Person">
    onboardingCompletedAt?: DateTimeNullableFilter<"Person"> | Date | string | null
    churchId?: StringFilter<"Person"> | string
    createdAt?: DateTimeFilter<"Person"> | Date | string
    updatedAt?: DateTimeFilter<"Person"> | Date | string
    youChurch?: XOR<ChurchScalarRelationFilter, ChurchWhereInput>
    volunteerScales?: VolunteerScaleListRelationFilter
  }, "id" | "email_churchId">

  export type PersonOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    contact?: SortOrder
    address?: SortOrderInput | SortOrder
    birthday?: SortOrderInput | SortOrder
    type?: SortOrder
    profileImage?: SortOrderInput | SortOrder
    ministry?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    firstVisitAt?: SortOrderInput | SortOrder
    onboardingDraft?: SortOrderInput | SortOrder
    onboardingCompletedAt?: SortOrderInput | SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PersonCountOrderByAggregateInput
    _max?: PersonMaxOrderByAggregateInput
    _min?: PersonMinOrderByAggregateInput
  }

  export type PersonScalarWhereWithAggregatesInput = {
    AND?: PersonScalarWhereWithAggregatesInput | PersonScalarWhereWithAggregatesInput[]
    OR?: PersonScalarWhereWithAggregatesInput[]
    NOT?: PersonScalarWhereWithAggregatesInput | PersonScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Person"> | string
    name?: StringWithAggregatesFilter<"Person"> | string
    email?: StringNullableWithAggregatesFilter<"Person"> | string | null
    contact?: StringNullableListFilter<"Person">
    address?: StringNullableWithAggregatesFilter<"Person"> | string | null
    birthday?: StringNullableWithAggregatesFilter<"Person"> | string | null
    type?: EnumTypePersonWithAggregatesFilter<"Person"> | $Enums.TypePerson
    profileImage?: StringNullableWithAggregatesFilter<"Person"> | string | null
    ministry?: StringNullableWithAggregatesFilter<"Person"> | string | null
    role?: StringNullableWithAggregatesFilter<"Person"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Person"> | string | null
    firstVisitAt?: DateTimeNullableWithAggregatesFilter<"Person"> | Date | string | null
    onboardingDraft?: JsonNullableWithAggregatesFilter<"Person">
    onboardingCompletedAt?: DateTimeNullableWithAggregatesFilter<"Person"> | Date | string | null
    churchId?: StringWithAggregatesFilter<"Person"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Person"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Person"> | Date | string
  }

  export type MinistryWhereInput = {
    AND?: MinistryWhereInput | MinistryWhereInput[]
    OR?: MinistryWhereInput[]
    NOT?: MinistryWhereInput | MinistryWhereInput[]
    id?: StringFilter<"Ministry"> | string
    name?: StringFilter<"Ministry"> | string
    description?: StringNullableFilter<"Ministry"> | string | null
    icon?: StringNullableFilter<"Ministry"> | string | null
    color?: StringNullableFilter<"Ministry"> | string | null
    churchId?: StringFilter<"Ministry"> | string
    createdAt?: DateTimeFilter<"Ministry"> | Date | string
    updatedAt?: DateTimeFilter<"Ministry"> | Date | string
    church?: XOR<ChurchScalarRelationFilter, ChurchWhereInput>
    scales?: VolunteerScaleListRelationFilter
  }

  export type MinistryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    icon?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    church?: ChurchOrderByWithRelationInput
    scales?: VolunteerScaleOrderByRelationAggregateInput
  }

  export type MinistryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name_churchId?: MinistryNameChurchIdCompoundUniqueInput
    AND?: MinistryWhereInput | MinistryWhereInput[]
    OR?: MinistryWhereInput[]
    NOT?: MinistryWhereInput | MinistryWhereInput[]
    name?: StringFilter<"Ministry"> | string
    description?: StringNullableFilter<"Ministry"> | string | null
    icon?: StringNullableFilter<"Ministry"> | string | null
    color?: StringNullableFilter<"Ministry"> | string | null
    churchId?: StringFilter<"Ministry"> | string
    createdAt?: DateTimeFilter<"Ministry"> | Date | string
    updatedAt?: DateTimeFilter<"Ministry"> | Date | string
    church?: XOR<ChurchScalarRelationFilter, ChurchWhereInput>
    scales?: VolunteerScaleListRelationFilter
  }, "id" | "name_churchId">

  export type MinistryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    icon?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MinistryCountOrderByAggregateInput
    _max?: MinistryMaxOrderByAggregateInput
    _min?: MinistryMinOrderByAggregateInput
  }

  export type MinistryScalarWhereWithAggregatesInput = {
    AND?: MinistryScalarWhereWithAggregatesInput | MinistryScalarWhereWithAggregatesInput[]
    OR?: MinistryScalarWhereWithAggregatesInput[]
    NOT?: MinistryScalarWhereWithAggregatesInput | MinistryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Ministry"> | string
    name?: StringWithAggregatesFilter<"Ministry"> | string
    description?: StringNullableWithAggregatesFilter<"Ministry"> | string | null
    icon?: StringNullableWithAggregatesFilter<"Ministry"> | string | null
    color?: StringNullableWithAggregatesFilter<"Ministry"> | string | null
    churchId?: StringWithAggregatesFilter<"Ministry"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Ministry"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Ministry"> | Date | string
  }

  export type VolunteerScaleWhereInput = {
    AND?: VolunteerScaleWhereInput | VolunteerScaleWhereInput[]
    OR?: VolunteerScaleWhereInput[]
    NOT?: VolunteerScaleWhereInput | VolunteerScaleWhereInput[]
    id?: StringFilter<"VolunteerScale"> | string
    date?: DateTimeFilter<"VolunteerScale"> | Date | string
    role?: StringFilter<"VolunteerScale"> | string
    eventName?: StringNullableFilter<"VolunteerScale"> | string | null
    confirmed?: BoolFilter<"VolunteerScale"> | boolean
    personId?: StringFilter<"VolunteerScale"> | string
    ministryId?: StringFilter<"VolunteerScale"> | string
    churchId?: StringFilter<"VolunteerScale"> | string
    createdAt?: DateTimeFilter<"VolunteerScale"> | Date | string
    updatedAt?: DateTimeFilter<"VolunteerScale"> | Date | string
    person?: XOR<PersonScalarRelationFilter, PersonWhereInput>
    ministry?: XOR<MinistryScalarRelationFilter, MinistryWhereInput>
    church?: XOR<ChurchScalarRelationFilter, ChurchWhereInput>
  }

  export type VolunteerScaleOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    role?: SortOrder
    eventName?: SortOrderInput | SortOrder
    confirmed?: SortOrder
    personId?: SortOrder
    ministryId?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    person?: PersonOrderByWithRelationInput
    ministry?: MinistryOrderByWithRelationInput
    church?: ChurchOrderByWithRelationInput
  }

  export type VolunteerScaleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VolunteerScaleWhereInput | VolunteerScaleWhereInput[]
    OR?: VolunteerScaleWhereInput[]
    NOT?: VolunteerScaleWhereInput | VolunteerScaleWhereInput[]
    date?: DateTimeFilter<"VolunteerScale"> | Date | string
    role?: StringFilter<"VolunteerScale"> | string
    eventName?: StringNullableFilter<"VolunteerScale"> | string | null
    confirmed?: BoolFilter<"VolunteerScale"> | boolean
    personId?: StringFilter<"VolunteerScale"> | string
    ministryId?: StringFilter<"VolunteerScale"> | string
    churchId?: StringFilter<"VolunteerScale"> | string
    createdAt?: DateTimeFilter<"VolunteerScale"> | Date | string
    updatedAt?: DateTimeFilter<"VolunteerScale"> | Date | string
    person?: XOR<PersonScalarRelationFilter, PersonWhereInput>
    ministry?: XOR<MinistryScalarRelationFilter, MinistryWhereInput>
    church?: XOR<ChurchScalarRelationFilter, ChurchWhereInput>
  }, "id">

  export type VolunteerScaleOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    role?: SortOrder
    eventName?: SortOrderInput | SortOrder
    confirmed?: SortOrder
    personId?: SortOrder
    ministryId?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VolunteerScaleCountOrderByAggregateInput
    _max?: VolunteerScaleMaxOrderByAggregateInput
    _min?: VolunteerScaleMinOrderByAggregateInput
  }

  export type VolunteerScaleScalarWhereWithAggregatesInput = {
    AND?: VolunteerScaleScalarWhereWithAggregatesInput | VolunteerScaleScalarWhereWithAggregatesInput[]
    OR?: VolunteerScaleScalarWhereWithAggregatesInput[]
    NOT?: VolunteerScaleScalarWhereWithAggregatesInput | VolunteerScaleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VolunteerScale"> | string
    date?: DateTimeWithAggregatesFilter<"VolunteerScale"> | Date | string
    role?: StringWithAggregatesFilter<"VolunteerScale"> | string
    eventName?: StringNullableWithAggregatesFilter<"VolunteerScale"> | string | null
    confirmed?: BoolWithAggregatesFilter<"VolunteerScale"> | boolean
    personId?: StringWithAggregatesFilter<"VolunteerScale"> | string
    ministryId?: StringWithAggregatesFilter<"VolunteerScale"> | string
    churchId?: StringWithAggregatesFilter<"VolunteerScale"> | string
    createdAt?: DateTimeWithAggregatesFilter<"VolunteerScale"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"VolunteerScale"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    token?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userId?: StringWithAggregatesFilter<"Session"> | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
  }

  export type ChurchCreateInput = {
    id?: string
    name: string
    label: string
    address: string
    contact?: ChurchCreatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: string | null
    pixKeyValue?: string | null
    pixCopyPaste?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutYouChurchInput
    persons?: PersonCreateNestedManyWithoutYouChurchInput
    links?: ChurchLinkCreateNestedManyWithoutChurchInput
    schedules?: WeeklyScheduleCreateNestedManyWithoutChurchInput
    ministries?: MinistryCreateNestedManyWithoutChurchInput
    volunteerScales?: VolunteerScaleCreateNestedManyWithoutChurchInput
    financialEntries?: FinancialEntryCreateNestedManyWithoutChurchInput
  }

  export type ChurchUncheckedCreateInput = {
    id?: string
    name: string
    label: string
    address: string
    contact?: ChurchCreatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: string | null
    pixKeyValue?: string | null
    pixCopyPaste?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutYouChurchInput
    persons?: PersonUncheckedCreateNestedManyWithoutYouChurchInput
    links?: ChurchLinkUncheckedCreateNestedManyWithoutChurchInput
    schedules?: WeeklyScheduleUncheckedCreateNestedManyWithoutChurchInput
    ministries?: MinistryUncheckedCreateNestedManyWithoutChurchInput
    volunteerScales?: VolunteerScaleUncheckedCreateNestedManyWithoutChurchInput
    financialEntries?: FinancialEntryUncheckedCreateNestedManyWithoutChurchInput
  }

  export type ChurchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contact?: ChurchUpdatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: NullableStringFieldUpdateOperationsInput | string | null
    pixKeyValue?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutYouChurchNestedInput
    persons?: PersonUpdateManyWithoutYouChurchNestedInput
    links?: ChurchLinkUpdateManyWithoutChurchNestedInput
    schedules?: WeeklyScheduleUpdateManyWithoutChurchNestedInput
    ministries?: MinistryUpdateManyWithoutChurchNestedInput
    volunteerScales?: VolunteerScaleUpdateManyWithoutChurchNestedInput
    financialEntries?: FinancialEntryUpdateManyWithoutChurchNestedInput
  }

  export type ChurchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contact?: ChurchUpdatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: NullableStringFieldUpdateOperationsInput | string | null
    pixKeyValue?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutYouChurchNestedInput
    persons?: PersonUncheckedUpdateManyWithoutYouChurchNestedInput
    links?: ChurchLinkUncheckedUpdateManyWithoutChurchNestedInput
    schedules?: WeeklyScheduleUncheckedUpdateManyWithoutChurchNestedInput
    ministries?: MinistryUncheckedUpdateManyWithoutChurchNestedInput
    volunteerScales?: VolunteerScaleUncheckedUpdateManyWithoutChurchNestedInput
    financialEntries?: FinancialEntryUncheckedUpdateManyWithoutChurchNestedInput
  }

  export type ChurchCreateManyInput = {
    id?: string
    name: string
    label: string
    address: string
    contact?: ChurchCreatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: string | null
    pixKeyValue?: string | null
    pixCopyPaste?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChurchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contact?: ChurchUpdatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: NullableStringFieldUpdateOperationsInput | string | null
    pixKeyValue?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChurchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contact?: ChurchUpdatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: NullableStringFieldUpdateOperationsInput | string | null
    pixKeyValue?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinancialEntryCreateInput = {
    id?: string
    amount: number
    category: string
    type?: $Enums.EntryType
    date?: Date | string
    donorName?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    church: ChurchCreateNestedOneWithoutFinancialEntriesInput
  }

  export type FinancialEntryUncheckedCreateInput = {
    id?: string
    amount: number
    category: string
    type?: $Enums.EntryType
    date?: Date | string
    donorName?: string | null
    description?: string | null
    churchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FinancialEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    donorName?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    church?: ChurchUpdateOneRequiredWithoutFinancialEntriesNestedInput
  }

  export type FinancialEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    donorName?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    churchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinancialEntryCreateManyInput = {
    id?: string
    amount: number
    category: string
    type?: $Enums.EntryType
    date?: Date | string
    donorName?: string | null
    description?: string | null
    churchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FinancialEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    donorName?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinancialEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    donorName?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    churchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChurchLinkCreateInput = {
    id?: string
    title: string
    url: string
    icon?: string | null
    active?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    church: ChurchCreateNestedOneWithoutLinksInput
  }

  export type ChurchLinkUncheckedCreateInput = {
    id?: string
    title: string
    url: string
    icon?: string | null
    active?: boolean
    order?: number
    churchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChurchLinkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    church?: ChurchUpdateOneRequiredWithoutLinksNestedInput
  }

  export type ChurchLinkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    churchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChurchLinkCreateManyInput = {
    id?: string
    title: string
    url: string
    icon?: string | null
    active?: boolean
    order?: number
    churchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChurchLinkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChurchLinkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    churchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyScheduleCreateInput = {
    id?: string
    title: string
    dayOfWeek: $Enums.DayOfWeek
    time: string
    description?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    church: ChurchCreateNestedOneWithoutSchedulesInput
  }

  export type WeeklyScheduleUncheckedCreateInput = {
    id?: string
    title: string
    dayOfWeek: $Enums.DayOfWeek
    time: string
    description?: string | null
    active?: boolean
    churchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeeklyScheduleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    time?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    church?: ChurchUpdateOneRequiredWithoutSchedulesNestedInput
  }

  export type WeeklyScheduleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    time?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    churchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyScheduleCreateManyInput = {
    id?: string
    title: string
    dayOfWeek: $Enums.DayOfWeek
    time: string
    description?: string | null
    active?: boolean
    churchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeeklyScheduleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    time?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyScheduleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    time?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    churchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.SystemRole
    status?: $Enums.TypePerson | null
    createdAt?: Date | string
    updatedAt?: Date | string
    youChurch?: ChurchCreateNestedOneWithoutUsersInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.SystemRole
    status?: $Enums.TypePerson | null
    churchId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumSystemRoleFieldUpdateOperationsInput | $Enums.SystemRole
    status?: NullableEnumTypePersonFieldUpdateOperationsInput | $Enums.TypePerson | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    youChurch?: ChurchUpdateOneWithoutUsersNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumSystemRoleFieldUpdateOperationsInput | $Enums.SystemRole
    status?: NullableEnumTypePersonFieldUpdateOperationsInput | $Enums.TypePerson | null
    churchId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.SystemRole
    status?: $Enums.TypePerson | null
    churchId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumSystemRoleFieldUpdateOperationsInput | $Enums.SystemRole
    status?: NullableEnumTypePersonFieldUpdateOperationsInput | $Enums.TypePerson | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumSystemRoleFieldUpdateOperationsInput | $Enums.SystemRole
    status?: NullableEnumTypePersonFieldUpdateOperationsInput | $Enums.TypePerson | null
    churchId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonCreateInput = {
    id?: string
    name: string
    email?: string | null
    contact?: PersonCreatecontactInput | string[]
    address?: string | null
    birthday?: string | null
    type?: $Enums.TypePerson
    profileImage?: string | null
    ministry?: string | null
    role?: string | null
    notes?: string | null
    firstVisitAt?: Date | string | null
    onboardingDraft?: NullableJsonNullValueInput | InputJsonValue
    onboardingCompletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    youChurch: ChurchCreateNestedOneWithoutPersonsInput
    volunteerScales?: VolunteerScaleCreateNestedManyWithoutPersonInput
  }

  export type PersonUncheckedCreateInput = {
    id?: string
    name: string
    email?: string | null
    contact?: PersonCreatecontactInput | string[]
    address?: string | null
    birthday?: string | null
    type?: $Enums.TypePerson
    profileImage?: string | null
    ministry?: string | null
    role?: string | null
    notes?: string | null
    firstVisitAt?: Date | string | null
    onboardingDraft?: NullableJsonNullValueInput | InputJsonValue
    onboardingCompletedAt?: Date | string | null
    churchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    volunteerScales?: VolunteerScaleUncheckedCreateNestedManyWithoutPersonInput
  }

  export type PersonUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: PersonUpdatecontactInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypePersonFieldUpdateOperationsInput | $Enums.TypePerson
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    ministry?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    firstVisitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingDraft?: NullableJsonNullValueInput | InputJsonValue
    onboardingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    youChurch?: ChurchUpdateOneRequiredWithoutPersonsNestedInput
    volunteerScales?: VolunteerScaleUpdateManyWithoutPersonNestedInput
  }

  export type PersonUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: PersonUpdatecontactInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypePersonFieldUpdateOperationsInput | $Enums.TypePerson
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    ministry?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    firstVisitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingDraft?: NullableJsonNullValueInput | InputJsonValue
    onboardingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    churchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    volunteerScales?: VolunteerScaleUncheckedUpdateManyWithoutPersonNestedInput
  }

  export type PersonCreateManyInput = {
    id?: string
    name: string
    email?: string | null
    contact?: PersonCreatecontactInput | string[]
    address?: string | null
    birthday?: string | null
    type?: $Enums.TypePerson
    profileImage?: string | null
    ministry?: string | null
    role?: string | null
    notes?: string | null
    firstVisitAt?: Date | string | null
    onboardingDraft?: NullableJsonNullValueInput | InputJsonValue
    onboardingCompletedAt?: Date | string | null
    churchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PersonUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: PersonUpdatecontactInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypePersonFieldUpdateOperationsInput | $Enums.TypePerson
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    ministry?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    firstVisitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingDraft?: NullableJsonNullValueInput | InputJsonValue
    onboardingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: PersonUpdatecontactInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypePersonFieldUpdateOperationsInput | $Enums.TypePerson
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    ministry?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    firstVisitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingDraft?: NullableJsonNullValueInput | InputJsonValue
    onboardingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    churchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MinistryCreateInput = {
    id?: string
    name: string
    description?: string | null
    icon?: string | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    church: ChurchCreateNestedOneWithoutMinistriesInput
    scales?: VolunteerScaleCreateNestedManyWithoutMinistryInput
  }

  export type MinistryUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    icon?: string | null
    color?: string | null
    churchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    scales?: VolunteerScaleUncheckedCreateNestedManyWithoutMinistryInput
  }

  export type MinistryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    church?: ChurchUpdateOneRequiredWithoutMinistriesNestedInput
    scales?: VolunteerScaleUpdateManyWithoutMinistryNestedInput
  }

  export type MinistryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    churchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scales?: VolunteerScaleUncheckedUpdateManyWithoutMinistryNestedInput
  }

  export type MinistryCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    icon?: string | null
    color?: string | null
    churchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MinistryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MinistryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    churchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VolunteerScaleCreateInput = {
    id?: string
    date: Date | string
    role: string
    eventName?: string | null
    confirmed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    person: PersonCreateNestedOneWithoutVolunteerScalesInput
    ministry: MinistryCreateNestedOneWithoutScalesInput
    church: ChurchCreateNestedOneWithoutVolunteerScalesInput
  }

  export type VolunteerScaleUncheckedCreateInput = {
    id?: string
    date: Date | string
    role: string
    eventName?: string | null
    confirmed?: boolean
    personId: string
    ministryId: string
    churchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VolunteerScaleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    person?: PersonUpdateOneRequiredWithoutVolunteerScalesNestedInput
    ministry?: MinistryUpdateOneRequiredWithoutScalesNestedInput
    church?: ChurchUpdateOneRequiredWithoutVolunteerScalesNestedInput
  }

  export type VolunteerScaleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    personId?: StringFieldUpdateOperationsInput | string
    ministryId?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VolunteerScaleCreateManyInput = {
    id?: string
    date: Date | string
    role: string
    eventName?: string | null
    confirmed?: boolean
    personId: string
    ministryId: string
    churchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VolunteerScaleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VolunteerScaleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    personId?: StringFieldUpdateOperationsInput | string
    ministryId?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateManyInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUncheckedCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateManyInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type PersonListRelationFilter = {
    every?: PersonWhereInput
    some?: PersonWhereInput
    none?: PersonWhereInput
  }

  export type ChurchLinkListRelationFilter = {
    every?: ChurchLinkWhereInput
    some?: ChurchLinkWhereInput
    none?: ChurchLinkWhereInput
  }

  export type WeeklyScheduleListRelationFilter = {
    every?: WeeklyScheduleWhereInput
    some?: WeeklyScheduleWhereInput
    none?: WeeklyScheduleWhereInput
  }

  export type MinistryListRelationFilter = {
    every?: MinistryWhereInput
    some?: MinistryWhereInput
    none?: MinistryWhereInput
  }

  export type VolunteerScaleListRelationFilter = {
    every?: VolunteerScaleWhereInput
    some?: VolunteerScaleWhereInput
    none?: VolunteerScaleWhereInput
  }

  export type FinancialEntryListRelationFilter = {
    every?: FinancialEntryWhereInput
    some?: FinancialEntryWhereInput
    none?: FinancialEntryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PersonOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChurchLinkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WeeklyScheduleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MinistryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VolunteerScaleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FinancialEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChurchCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    address?: SortOrder
    contact?: SortOrder
    customization?: SortOrder
    pixKeyType?: SortOrder
    pixKeyValue?: SortOrder
    pixCopyPaste?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChurchMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    address?: SortOrder
    pixKeyType?: SortOrder
    pixKeyValue?: SortOrder
    pixCopyPaste?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChurchMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    address?: SortOrder
    pixKeyType?: SortOrder
    pixKeyValue?: SortOrder
    pixCopyPaste?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumEntryTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EntryType | EnumEntryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEntryTypeFilter<$PrismaModel> | $Enums.EntryType
  }

  export type ChurchScalarRelationFilter = {
    is?: ChurchWhereInput
    isNot?: ChurchWhereInput
  }

  export type FinancialEntryCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    category?: SortOrder
    type?: SortOrder
    date?: SortOrder
    donorName?: SortOrder
    description?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FinancialEntryAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type FinancialEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    category?: SortOrder
    type?: SortOrder
    date?: SortOrder
    donorName?: SortOrder
    description?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FinancialEntryMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    category?: SortOrder
    type?: SortOrder
    date?: SortOrder
    donorName?: SortOrder
    description?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FinancialEntrySumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumEntryTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EntryType | EnumEntryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEntryTypeWithAggregatesFilter<$PrismaModel> | $Enums.EntryType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEntryTypeFilter<$PrismaModel>
    _max?: NestedEnumEntryTypeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ChurchLinkCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    icon?: SortOrder
    active?: SortOrder
    order?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChurchLinkAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type ChurchLinkMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    icon?: SortOrder
    active?: SortOrder
    order?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChurchLinkMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    icon?: SortOrder
    active?: SortOrder
    order?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChurchLinkSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumDayOfWeekFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekFilter<$PrismaModel> | $Enums.DayOfWeek
  }

  export type WeeklyScheduleCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    dayOfWeek?: SortOrder
    time?: SortOrder
    description?: SortOrder
    active?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeeklyScheduleMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    dayOfWeek?: SortOrder
    time?: SortOrder
    description?: SortOrder
    active?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeeklyScheduleMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    dayOfWeek?: SortOrder
    time?: SortOrder
    description?: SortOrder
    active?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumDayOfWeekWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel> | $Enums.DayOfWeek
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDayOfWeekFilter<$PrismaModel>
    _max?: NestedEnumDayOfWeekFilter<$PrismaModel>
  }

  export type EnumSystemRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.SystemRole | EnumSystemRoleFieldRefInput<$PrismaModel>
    in?: $Enums.SystemRole[] | ListEnumSystemRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.SystemRole[] | ListEnumSystemRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumSystemRoleFilter<$PrismaModel> | $Enums.SystemRole
  }

  export type EnumTypePersonNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.TypePerson | EnumTypePersonFieldRefInput<$PrismaModel> | null
    in?: $Enums.TypePerson[] | ListEnumTypePersonFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TypePerson[] | ListEnumTypePersonFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTypePersonNullableFilter<$PrismaModel> | $Enums.TypePerson | null
  }

  export type ChurchNullableScalarRelationFilter = {
    is?: ChurchWhereInput | null
    isNot?: ChurchWhereInput | null
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    status?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    status?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    status?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumSystemRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SystemRole | EnumSystemRoleFieldRefInput<$PrismaModel>
    in?: $Enums.SystemRole[] | ListEnumSystemRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.SystemRole[] | ListEnumSystemRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumSystemRoleWithAggregatesFilter<$PrismaModel> | $Enums.SystemRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSystemRoleFilter<$PrismaModel>
    _max?: NestedEnumSystemRoleFilter<$PrismaModel>
  }

  export type EnumTypePersonNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypePerson | EnumTypePersonFieldRefInput<$PrismaModel> | null
    in?: $Enums.TypePerson[] | ListEnumTypePersonFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TypePerson[] | ListEnumTypePersonFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTypePersonNullableWithAggregatesFilter<$PrismaModel> | $Enums.TypePerson | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumTypePersonNullableFilter<$PrismaModel>
    _max?: NestedEnumTypePersonNullableFilter<$PrismaModel>
  }

  export type EnumTypePersonFilter<$PrismaModel = never> = {
    equals?: $Enums.TypePerson | EnumTypePersonFieldRefInput<$PrismaModel>
    in?: $Enums.TypePerson[] | ListEnumTypePersonFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypePerson[] | ListEnumTypePersonFieldRefInput<$PrismaModel>
    not?: NestedEnumTypePersonFilter<$PrismaModel> | $Enums.TypePerson
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PersonEmailChurchIdCompoundUniqueInput = {
    email: string
    churchId: string
  }

  export type PersonCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    contact?: SortOrder
    address?: SortOrder
    birthday?: SortOrder
    type?: SortOrder
    profileImage?: SortOrder
    ministry?: SortOrder
    role?: SortOrder
    notes?: SortOrder
    firstVisitAt?: SortOrder
    onboardingDraft?: SortOrder
    onboardingCompletedAt?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    address?: SortOrder
    birthday?: SortOrder
    type?: SortOrder
    profileImage?: SortOrder
    ministry?: SortOrder
    role?: SortOrder
    notes?: SortOrder
    firstVisitAt?: SortOrder
    onboardingCompletedAt?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    address?: SortOrder
    birthday?: SortOrder
    type?: SortOrder
    profileImage?: SortOrder
    ministry?: SortOrder
    role?: SortOrder
    notes?: SortOrder
    firstVisitAt?: SortOrder
    onboardingCompletedAt?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTypePersonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypePerson | EnumTypePersonFieldRefInput<$PrismaModel>
    in?: $Enums.TypePerson[] | ListEnumTypePersonFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypePerson[] | ListEnumTypePersonFieldRefInput<$PrismaModel>
    not?: NestedEnumTypePersonWithAggregatesFilter<$PrismaModel> | $Enums.TypePerson
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTypePersonFilter<$PrismaModel>
    _max?: NestedEnumTypePersonFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type MinistryNameChurchIdCompoundUniqueInput = {
    name: string
    churchId: string
  }

  export type MinistryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MinistryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MinistryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonScalarRelationFilter = {
    is?: PersonWhereInput
    isNot?: PersonWhereInput
  }

  export type MinistryScalarRelationFilter = {
    is?: MinistryWhereInput
    isNot?: MinistryWhereInput
  }

  export type VolunteerScaleCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    role?: SortOrder
    eventName?: SortOrder
    confirmed?: SortOrder
    personId?: SortOrder
    ministryId?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VolunteerScaleMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    role?: SortOrder
    eventName?: SortOrder
    confirmed?: SortOrder
    personId?: SortOrder
    ministryId?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VolunteerScaleMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    role?: SortOrder
    eventName?: SortOrder
    confirmed?: SortOrder
    personId?: SortOrder
    ministryId?: SortOrder
    churchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChurchCreatecontactInput = {
    set: string[]
  }

  export type UserCreateNestedManyWithoutYouChurchInput = {
    create?: XOR<UserCreateWithoutYouChurchInput, UserUncheckedCreateWithoutYouChurchInput> | UserCreateWithoutYouChurchInput[] | UserUncheckedCreateWithoutYouChurchInput[]
    connectOrCreate?: UserCreateOrConnectWithoutYouChurchInput | UserCreateOrConnectWithoutYouChurchInput[]
    createMany?: UserCreateManyYouChurchInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PersonCreateNestedManyWithoutYouChurchInput = {
    create?: XOR<PersonCreateWithoutYouChurchInput, PersonUncheckedCreateWithoutYouChurchInput> | PersonCreateWithoutYouChurchInput[] | PersonUncheckedCreateWithoutYouChurchInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutYouChurchInput | PersonCreateOrConnectWithoutYouChurchInput[]
    createMany?: PersonCreateManyYouChurchInputEnvelope
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type ChurchLinkCreateNestedManyWithoutChurchInput = {
    create?: XOR<ChurchLinkCreateWithoutChurchInput, ChurchLinkUncheckedCreateWithoutChurchInput> | ChurchLinkCreateWithoutChurchInput[] | ChurchLinkUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: ChurchLinkCreateOrConnectWithoutChurchInput | ChurchLinkCreateOrConnectWithoutChurchInput[]
    createMany?: ChurchLinkCreateManyChurchInputEnvelope
    connect?: ChurchLinkWhereUniqueInput | ChurchLinkWhereUniqueInput[]
  }

  export type WeeklyScheduleCreateNestedManyWithoutChurchInput = {
    create?: XOR<WeeklyScheduleCreateWithoutChurchInput, WeeklyScheduleUncheckedCreateWithoutChurchInput> | WeeklyScheduleCreateWithoutChurchInput[] | WeeklyScheduleUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: WeeklyScheduleCreateOrConnectWithoutChurchInput | WeeklyScheduleCreateOrConnectWithoutChurchInput[]
    createMany?: WeeklyScheduleCreateManyChurchInputEnvelope
    connect?: WeeklyScheduleWhereUniqueInput | WeeklyScheduleWhereUniqueInput[]
  }

  export type MinistryCreateNestedManyWithoutChurchInput = {
    create?: XOR<MinistryCreateWithoutChurchInput, MinistryUncheckedCreateWithoutChurchInput> | MinistryCreateWithoutChurchInput[] | MinistryUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: MinistryCreateOrConnectWithoutChurchInput | MinistryCreateOrConnectWithoutChurchInput[]
    createMany?: MinistryCreateManyChurchInputEnvelope
    connect?: MinistryWhereUniqueInput | MinistryWhereUniqueInput[]
  }

  export type VolunteerScaleCreateNestedManyWithoutChurchInput = {
    create?: XOR<VolunteerScaleCreateWithoutChurchInput, VolunteerScaleUncheckedCreateWithoutChurchInput> | VolunteerScaleCreateWithoutChurchInput[] | VolunteerScaleUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: VolunteerScaleCreateOrConnectWithoutChurchInput | VolunteerScaleCreateOrConnectWithoutChurchInput[]
    createMany?: VolunteerScaleCreateManyChurchInputEnvelope
    connect?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
  }

  export type FinancialEntryCreateNestedManyWithoutChurchInput = {
    create?: XOR<FinancialEntryCreateWithoutChurchInput, FinancialEntryUncheckedCreateWithoutChurchInput> | FinancialEntryCreateWithoutChurchInput[] | FinancialEntryUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: FinancialEntryCreateOrConnectWithoutChurchInput | FinancialEntryCreateOrConnectWithoutChurchInput[]
    createMany?: FinancialEntryCreateManyChurchInputEnvelope
    connect?: FinancialEntryWhereUniqueInput | FinancialEntryWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutYouChurchInput = {
    create?: XOR<UserCreateWithoutYouChurchInput, UserUncheckedCreateWithoutYouChurchInput> | UserCreateWithoutYouChurchInput[] | UserUncheckedCreateWithoutYouChurchInput[]
    connectOrCreate?: UserCreateOrConnectWithoutYouChurchInput | UserCreateOrConnectWithoutYouChurchInput[]
    createMany?: UserCreateManyYouChurchInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PersonUncheckedCreateNestedManyWithoutYouChurchInput = {
    create?: XOR<PersonCreateWithoutYouChurchInput, PersonUncheckedCreateWithoutYouChurchInput> | PersonCreateWithoutYouChurchInput[] | PersonUncheckedCreateWithoutYouChurchInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutYouChurchInput | PersonCreateOrConnectWithoutYouChurchInput[]
    createMany?: PersonCreateManyYouChurchInputEnvelope
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type ChurchLinkUncheckedCreateNestedManyWithoutChurchInput = {
    create?: XOR<ChurchLinkCreateWithoutChurchInput, ChurchLinkUncheckedCreateWithoutChurchInput> | ChurchLinkCreateWithoutChurchInput[] | ChurchLinkUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: ChurchLinkCreateOrConnectWithoutChurchInput | ChurchLinkCreateOrConnectWithoutChurchInput[]
    createMany?: ChurchLinkCreateManyChurchInputEnvelope
    connect?: ChurchLinkWhereUniqueInput | ChurchLinkWhereUniqueInput[]
  }

  export type WeeklyScheduleUncheckedCreateNestedManyWithoutChurchInput = {
    create?: XOR<WeeklyScheduleCreateWithoutChurchInput, WeeklyScheduleUncheckedCreateWithoutChurchInput> | WeeklyScheduleCreateWithoutChurchInput[] | WeeklyScheduleUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: WeeklyScheduleCreateOrConnectWithoutChurchInput | WeeklyScheduleCreateOrConnectWithoutChurchInput[]
    createMany?: WeeklyScheduleCreateManyChurchInputEnvelope
    connect?: WeeklyScheduleWhereUniqueInput | WeeklyScheduleWhereUniqueInput[]
  }

  export type MinistryUncheckedCreateNestedManyWithoutChurchInput = {
    create?: XOR<MinistryCreateWithoutChurchInput, MinistryUncheckedCreateWithoutChurchInput> | MinistryCreateWithoutChurchInput[] | MinistryUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: MinistryCreateOrConnectWithoutChurchInput | MinistryCreateOrConnectWithoutChurchInput[]
    createMany?: MinistryCreateManyChurchInputEnvelope
    connect?: MinistryWhereUniqueInput | MinistryWhereUniqueInput[]
  }

  export type VolunteerScaleUncheckedCreateNestedManyWithoutChurchInput = {
    create?: XOR<VolunteerScaleCreateWithoutChurchInput, VolunteerScaleUncheckedCreateWithoutChurchInput> | VolunteerScaleCreateWithoutChurchInput[] | VolunteerScaleUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: VolunteerScaleCreateOrConnectWithoutChurchInput | VolunteerScaleCreateOrConnectWithoutChurchInput[]
    createMany?: VolunteerScaleCreateManyChurchInputEnvelope
    connect?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
  }

  export type FinancialEntryUncheckedCreateNestedManyWithoutChurchInput = {
    create?: XOR<FinancialEntryCreateWithoutChurchInput, FinancialEntryUncheckedCreateWithoutChurchInput> | FinancialEntryCreateWithoutChurchInput[] | FinancialEntryUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: FinancialEntryCreateOrConnectWithoutChurchInput | FinancialEntryCreateOrConnectWithoutChurchInput[]
    createMany?: FinancialEntryCreateManyChurchInputEnvelope
    connect?: FinancialEntryWhereUniqueInput | FinancialEntryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type ChurchUpdatecontactInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateManyWithoutYouChurchNestedInput = {
    create?: XOR<UserCreateWithoutYouChurchInput, UserUncheckedCreateWithoutYouChurchInput> | UserCreateWithoutYouChurchInput[] | UserUncheckedCreateWithoutYouChurchInput[]
    connectOrCreate?: UserCreateOrConnectWithoutYouChurchInput | UserCreateOrConnectWithoutYouChurchInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutYouChurchInput | UserUpsertWithWhereUniqueWithoutYouChurchInput[]
    createMany?: UserCreateManyYouChurchInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutYouChurchInput | UserUpdateWithWhereUniqueWithoutYouChurchInput[]
    updateMany?: UserUpdateManyWithWhereWithoutYouChurchInput | UserUpdateManyWithWhereWithoutYouChurchInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type PersonUpdateManyWithoutYouChurchNestedInput = {
    create?: XOR<PersonCreateWithoutYouChurchInput, PersonUncheckedCreateWithoutYouChurchInput> | PersonCreateWithoutYouChurchInput[] | PersonUncheckedCreateWithoutYouChurchInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutYouChurchInput | PersonCreateOrConnectWithoutYouChurchInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutYouChurchInput | PersonUpsertWithWhereUniqueWithoutYouChurchInput[]
    createMany?: PersonCreateManyYouChurchInputEnvelope
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutYouChurchInput | PersonUpdateWithWhereUniqueWithoutYouChurchInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutYouChurchInput | PersonUpdateManyWithWhereWithoutYouChurchInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type ChurchLinkUpdateManyWithoutChurchNestedInput = {
    create?: XOR<ChurchLinkCreateWithoutChurchInput, ChurchLinkUncheckedCreateWithoutChurchInput> | ChurchLinkCreateWithoutChurchInput[] | ChurchLinkUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: ChurchLinkCreateOrConnectWithoutChurchInput | ChurchLinkCreateOrConnectWithoutChurchInput[]
    upsert?: ChurchLinkUpsertWithWhereUniqueWithoutChurchInput | ChurchLinkUpsertWithWhereUniqueWithoutChurchInput[]
    createMany?: ChurchLinkCreateManyChurchInputEnvelope
    set?: ChurchLinkWhereUniqueInput | ChurchLinkWhereUniqueInput[]
    disconnect?: ChurchLinkWhereUniqueInput | ChurchLinkWhereUniqueInput[]
    delete?: ChurchLinkWhereUniqueInput | ChurchLinkWhereUniqueInput[]
    connect?: ChurchLinkWhereUniqueInput | ChurchLinkWhereUniqueInput[]
    update?: ChurchLinkUpdateWithWhereUniqueWithoutChurchInput | ChurchLinkUpdateWithWhereUniqueWithoutChurchInput[]
    updateMany?: ChurchLinkUpdateManyWithWhereWithoutChurchInput | ChurchLinkUpdateManyWithWhereWithoutChurchInput[]
    deleteMany?: ChurchLinkScalarWhereInput | ChurchLinkScalarWhereInput[]
  }

  export type WeeklyScheduleUpdateManyWithoutChurchNestedInput = {
    create?: XOR<WeeklyScheduleCreateWithoutChurchInput, WeeklyScheduleUncheckedCreateWithoutChurchInput> | WeeklyScheduleCreateWithoutChurchInput[] | WeeklyScheduleUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: WeeklyScheduleCreateOrConnectWithoutChurchInput | WeeklyScheduleCreateOrConnectWithoutChurchInput[]
    upsert?: WeeklyScheduleUpsertWithWhereUniqueWithoutChurchInput | WeeklyScheduleUpsertWithWhereUniqueWithoutChurchInput[]
    createMany?: WeeklyScheduleCreateManyChurchInputEnvelope
    set?: WeeklyScheduleWhereUniqueInput | WeeklyScheduleWhereUniqueInput[]
    disconnect?: WeeklyScheduleWhereUniqueInput | WeeklyScheduleWhereUniqueInput[]
    delete?: WeeklyScheduleWhereUniqueInput | WeeklyScheduleWhereUniqueInput[]
    connect?: WeeklyScheduleWhereUniqueInput | WeeklyScheduleWhereUniqueInput[]
    update?: WeeklyScheduleUpdateWithWhereUniqueWithoutChurchInput | WeeklyScheduleUpdateWithWhereUniqueWithoutChurchInput[]
    updateMany?: WeeklyScheduleUpdateManyWithWhereWithoutChurchInput | WeeklyScheduleUpdateManyWithWhereWithoutChurchInput[]
    deleteMany?: WeeklyScheduleScalarWhereInput | WeeklyScheduleScalarWhereInput[]
  }

  export type MinistryUpdateManyWithoutChurchNestedInput = {
    create?: XOR<MinistryCreateWithoutChurchInput, MinistryUncheckedCreateWithoutChurchInput> | MinistryCreateWithoutChurchInput[] | MinistryUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: MinistryCreateOrConnectWithoutChurchInput | MinistryCreateOrConnectWithoutChurchInput[]
    upsert?: MinistryUpsertWithWhereUniqueWithoutChurchInput | MinistryUpsertWithWhereUniqueWithoutChurchInput[]
    createMany?: MinistryCreateManyChurchInputEnvelope
    set?: MinistryWhereUniqueInput | MinistryWhereUniqueInput[]
    disconnect?: MinistryWhereUniqueInput | MinistryWhereUniqueInput[]
    delete?: MinistryWhereUniqueInput | MinistryWhereUniqueInput[]
    connect?: MinistryWhereUniqueInput | MinistryWhereUniqueInput[]
    update?: MinistryUpdateWithWhereUniqueWithoutChurchInput | MinistryUpdateWithWhereUniqueWithoutChurchInput[]
    updateMany?: MinistryUpdateManyWithWhereWithoutChurchInput | MinistryUpdateManyWithWhereWithoutChurchInput[]
    deleteMany?: MinistryScalarWhereInput | MinistryScalarWhereInput[]
  }

  export type VolunteerScaleUpdateManyWithoutChurchNestedInput = {
    create?: XOR<VolunteerScaleCreateWithoutChurchInput, VolunteerScaleUncheckedCreateWithoutChurchInput> | VolunteerScaleCreateWithoutChurchInput[] | VolunteerScaleUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: VolunteerScaleCreateOrConnectWithoutChurchInput | VolunteerScaleCreateOrConnectWithoutChurchInput[]
    upsert?: VolunteerScaleUpsertWithWhereUniqueWithoutChurchInput | VolunteerScaleUpsertWithWhereUniqueWithoutChurchInput[]
    createMany?: VolunteerScaleCreateManyChurchInputEnvelope
    set?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    disconnect?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    delete?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    connect?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    update?: VolunteerScaleUpdateWithWhereUniqueWithoutChurchInput | VolunteerScaleUpdateWithWhereUniqueWithoutChurchInput[]
    updateMany?: VolunteerScaleUpdateManyWithWhereWithoutChurchInput | VolunteerScaleUpdateManyWithWhereWithoutChurchInput[]
    deleteMany?: VolunteerScaleScalarWhereInput | VolunteerScaleScalarWhereInput[]
  }

  export type FinancialEntryUpdateManyWithoutChurchNestedInput = {
    create?: XOR<FinancialEntryCreateWithoutChurchInput, FinancialEntryUncheckedCreateWithoutChurchInput> | FinancialEntryCreateWithoutChurchInput[] | FinancialEntryUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: FinancialEntryCreateOrConnectWithoutChurchInput | FinancialEntryCreateOrConnectWithoutChurchInput[]
    upsert?: FinancialEntryUpsertWithWhereUniqueWithoutChurchInput | FinancialEntryUpsertWithWhereUniqueWithoutChurchInput[]
    createMany?: FinancialEntryCreateManyChurchInputEnvelope
    set?: FinancialEntryWhereUniqueInput | FinancialEntryWhereUniqueInput[]
    disconnect?: FinancialEntryWhereUniqueInput | FinancialEntryWhereUniqueInput[]
    delete?: FinancialEntryWhereUniqueInput | FinancialEntryWhereUniqueInput[]
    connect?: FinancialEntryWhereUniqueInput | FinancialEntryWhereUniqueInput[]
    update?: FinancialEntryUpdateWithWhereUniqueWithoutChurchInput | FinancialEntryUpdateWithWhereUniqueWithoutChurchInput[]
    updateMany?: FinancialEntryUpdateManyWithWhereWithoutChurchInput | FinancialEntryUpdateManyWithWhereWithoutChurchInput[]
    deleteMany?: FinancialEntryScalarWhereInput | FinancialEntryScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutYouChurchNestedInput = {
    create?: XOR<UserCreateWithoutYouChurchInput, UserUncheckedCreateWithoutYouChurchInput> | UserCreateWithoutYouChurchInput[] | UserUncheckedCreateWithoutYouChurchInput[]
    connectOrCreate?: UserCreateOrConnectWithoutYouChurchInput | UserCreateOrConnectWithoutYouChurchInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutYouChurchInput | UserUpsertWithWhereUniqueWithoutYouChurchInput[]
    createMany?: UserCreateManyYouChurchInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutYouChurchInput | UserUpdateWithWhereUniqueWithoutYouChurchInput[]
    updateMany?: UserUpdateManyWithWhereWithoutYouChurchInput | UserUpdateManyWithWhereWithoutYouChurchInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type PersonUncheckedUpdateManyWithoutYouChurchNestedInput = {
    create?: XOR<PersonCreateWithoutYouChurchInput, PersonUncheckedCreateWithoutYouChurchInput> | PersonCreateWithoutYouChurchInput[] | PersonUncheckedCreateWithoutYouChurchInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutYouChurchInput | PersonCreateOrConnectWithoutYouChurchInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutYouChurchInput | PersonUpsertWithWhereUniqueWithoutYouChurchInput[]
    createMany?: PersonCreateManyYouChurchInputEnvelope
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutYouChurchInput | PersonUpdateWithWhereUniqueWithoutYouChurchInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutYouChurchInput | PersonUpdateManyWithWhereWithoutYouChurchInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type ChurchLinkUncheckedUpdateManyWithoutChurchNestedInput = {
    create?: XOR<ChurchLinkCreateWithoutChurchInput, ChurchLinkUncheckedCreateWithoutChurchInput> | ChurchLinkCreateWithoutChurchInput[] | ChurchLinkUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: ChurchLinkCreateOrConnectWithoutChurchInput | ChurchLinkCreateOrConnectWithoutChurchInput[]
    upsert?: ChurchLinkUpsertWithWhereUniqueWithoutChurchInput | ChurchLinkUpsertWithWhereUniqueWithoutChurchInput[]
    createMany?: ChurchLinkCreateManyChurchInputEnvelope
    set?: ChurchLinkWhereUniqueInput | ChurchLinkWhereUniqueInput[]
    disconnect?: ChurchLinkWhereUniqueInput | ChurchLinkWhereUniqueInput[]
    delete?: ChurchLinkWhereUniqueInput | ChurchLinkWhereUniqueInput[]
    connect?: ChurchLinkWhereUniqueInput | ChurchLinkWhereUniqueInput[]
    update?: ChurchLinkUpdateWithWhereUniqueWithoutChurchInput | ChurchLinkUpdateWithWhereUniqueWithoutChurchInput[]
    updateMany?: ChurchLinkUpdateManyWithWhereWithoutChurchInput | ChurchLinkUpdateManyWithWhereWithoutChurchInput[]
    deleteMany?: ChurchLinkScalarWhereInput | ChurchLinkScalarWhereInput[]
  }

  export type WeeklyScheduleUncheckedUpdateManyWithoutChurchNestedInput = {
    create?: XOR<WeeklyScheduleCreateWithoutChurchInput, WeeklyScheduleUncheckedCreateWithoutChurchInput> | WeeklyScheduleCreateWithoutChurchInput[] | WeeklyScheduleUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: WeeklyScheduleCreateOrConnectWithoutChurchInput | WeeklyScheduleCreateOrConnectWithoutChurchInput[]
    upsert?: WeeklyScheduleUpsertWithWhereUniqueWithoutChurchInput | WeeklyScheduleUpsertWithWhereUniqueWithoutChurchInput[]
    createMany?: WeeklyScheduleCreateManyChurchInputEnvelope
    set?: WeeklyScheduleWhereUniqueInput | WeeklyScheduleWhereUniqueInput[]
    disconnect?: WeeklyScheduleWhereUniqueInput | WeeklyScheduleWhereUniqueInput[]
    delete?: WeeklyScheduleWhereUniqueInput | WeeklyScheduleWhereUniqueInput[]
    connect?: WeeklyScheduleWhereUniqueInput | WeeklyScheduleWhereUniqueInput[]
    update?: WeeklyScheduleUpdateWithWhereUniqueWithoutChurchInput | WeeklyScheduleUpdateWithWhereUniqueWithoutChurchInput[]
    updateMany?: WeeklyScheduleUpdateManyWithWhereWithoutChurchInput | WeeklyScheduleUpdateManyWithWhereWithoutChurchInput[]
    deleteMany?: WeeklyScheduleScalarWhereInput | WeeklyScheduleScalarWhereInput[]
  }

  export type MinistryUncheckedUpdateManyWithoutChurchNestedInput = {
    create?: XOR<MinistryCreateWithoutChurchInput, MinistryUncheckedCreateWithoutChurchInput> | MinistryCreateWithoutChurchInput[] | MinistryUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: MinistryCreateOrConnectWithoutChurchInput | MinistryCreateOrConnectWithoutChurchInput[]
    upsert?: MinistryUpsertWithWhereUniqueWithoutChurchInput | MinistryUpsertWithWhereUniqueWithoutChurchInput[]
    createMany?: MinistryCreateManyChurchInputEnvelope
    set?: MinistryWhereUniqueInput | MinistryWhereUniqueInput[]
    disconnect?: MinistryWhereUniqueInput | MinistryWhereUniqueInput[]
    delete?: MinistryWhereUniqueInput | MinistryWhereUniqueInput[]
    connect?: MinistryWhereUniqueInput | MinistryWhereUniqueInput[]
    update?: MinistryUpdateWithWhereUniqueWithoutChurchInput | MinistryUpdateWithWhereUniqueWithoutChurchInput[]
    updateMany?: MinistryUpdateManyWithWhereWithoutChurchInput | MinistryUpdateManyWithWhereWithoutChurchInput[]
    deleteMany?: MinistryScalarWhereInput | MinistryScalarWhereInput[]
  }

  export type VolunteerScaleUncheckedUpdateManyWithoutChurchNestedInput = {
    create?: XOR<VolunteerScaleCreateWithoutChurchInput, VolunteerScaleUncheckedCreateWithoutChurchInput> | VolunteerScaleCreateWithoutChurchInput[] | VolunteerScaleUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: VolunteerScaleCreateOrConnectWithoutChurchInput | VolunteerScaleCreateOrConnectWithoutChurchInput[]
    upsert?: VolunteerScaleUpsertWithWhereUniqueWithoutChurchInput | VolunteerScaleUpsertWithWhereUniqueWithoutChurchInput[]
    createMany?: VolunteerScaleCreateManyChurchInputEnvelope
    set?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    disconnect?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    delete?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    connect?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    update?: VolunteerScaleUpdateWithWhereUniqueWithoutChurchInput | VolunteerScaleUpdateWithWhereUniqueWithoutChurchInput[]
    updateMany?: VolunteerScaleUpdateManyWithWhereWithoutChurchInput | VolunteerScaleUpdateManyWithWhereWithoutChurchInput[]
    deleteMany?: VolunteerScaleScalarWhereInput | VolunteerScaleScalarWhereInput[]
  }

  export type FinancialEntryUncheckedUpdateManyWithoutChurchNestedInput = {
    create?: XOR<FinancialEntryCreateWithoutChurchInput, FinancialEntryUncheckedCreateWithoutChurchInput> | FinancialEntryCreateWithoutChurchInput[] | FinancialEntryUncheckedCreateWithoutChurchInput[]
    connectOrCreate?: FinancialEntryCreateOrConnectWithoutChurchInput | FinancialEntryCreateOrConnectWithoutChurchInput[]
    upsert?: FinancialEntryUpsertWithWhereUniqueWithoutChurchInput | FinancialEntryUpsertWithWhereUniqueWithoutChurchInput[]
    createMany?: FinancialEntryCreateManyChurchInputEnvelope
    set?: FinancialEntryWhereUniqueInput | FinancialEntryWhereUniqueInput[]
    disconnect?: FinancialEntryWhereUniqueInput | FinancialEntryWhereUniqueInput[]
    delete?: FinancialEntryWhereUniqueInput | FinancialEntryWhereUniqueInput[]
    connect?: FinancialEntryWhereUniqueInput | FinancialEntryWhereUniqueInput[]
    update?: FinancialEntryUpdateWithWhereUniqueWithoutChurchInput | FinancialEntryUpdateWithWhereUniqueWithoutChurchInput[]
    updateMany?: FinancialEntryUpdateManyWithWhereWithoutChurchInput | FinancialEntryUpdateManyWithWhereWithoutChurchInput[]
    deleteMany?: FinancialEntryScalarWhereInput | FinancialEntryScalarWhereInput[]
  }

  export type ChurchCreateNestedOneWithoutFinancialEntriesInput = {
    create?: XOR<ChurchCreateWithoutFinancialEntriesInput, ChurchUncheckedCreateWithoutFinancialEntriesInput>
    connectOrCreate?: ChurchCreateOrConnectWithoutFinancialEntriesInput
    connect?: ChurchWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumEntryTypeFieldUpdateOperationsInput = {
    set?: $Enums.EntryType
  }

  export type ChurchUpdateOneRequiredWithoutFinancialEntriesNestedInput = {
    create?: XOR<ChurchCreateWithoutFinancialEntriesInput, ChurchUncheckedCreateWithoutFinancialEntriesInput>
    connectOrCreate?: ChurchCreateOrConnectWithoutFinancialEntriesInput
    upsert?: ChurchUpsertWithoutFinancialEntriesInput
    connect?: ChurchWhereUniqueInput
    update?: XOR<XOR<ChurchUpdateToOneWithWhereWithoutFinancialEntriesInput, ChurchUpdateWithoutFinancialEntriesInput>, ChurchUncheckedUpdateWithoutFinancialEntriesInput>
  }

  export type ChurchCreateNestedOneWithoutLinksInput = {
    create?: XOR<ChurchCreateWithoutLinksInput, ChurchUncheckedCreateWithoutLinksInput>
    connectOrCreate?: ChurchCreateOrConnectWithoutLinksInput
    connect?: ChurchWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ChurchUpdateOneRequiredWithoutLinksNestedInput = {
    create?: XOR<ChurchCreateWithoutLinksInput, ChurchUncheckedCreateWithoutLinksInput>
    connectOrCreate?: ChurchCreateOrConnectWithoutLinksInput
    upsert?: ChurchUpsertWithoutLinksInput
    connect?: ChurchWhereUniqueInput
    update?: XOR<XOR<ChurchUpdateToOneWithWhereWithoutLinksInput, ChurchUpdateWithoutLinksInput>, ChurchUncheckedUpdateWithoutLinksInput>
  }

  export type ChurchCreateNestedOneWithoutSchedulesInput = {
    create?: XOR<ChurchCreateWithoutSchedulesInput, ChurchUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: ChurchCreateOrConnectWithoutSchedulesInput
    connect?: ChurchWhereUniqueInput
  }

  export type EnumDayOfWeekFieldUpdateOperationsInput = {
    set?: $Enums.DayOfWeek
  }

  export type ChurchUpdateOneRequiredWithoutSchedulesNestedInput = {
    create?: XOR<ChurchCreateWithoutSchedulesInput, ChurchUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: ChurchCreateOrConnectWithoutSchedulesInput
    upsert?: ChurchUpsertWithoutSchedulesInput
    connect?: ChurchWhereUniqueInput
    update?: XOR<XOR<ChurchUpdateToOneWithWhereWithoutSchedulesInput, ChurchUpdateWithoutSchedulesInput>, ChurchUncheckedUpdateWithoutSchedulesInput>
  }

  export type ChurchCreateNestedOneWithoutUsersInput = {
    create?: XOR<ChurchCreateWithoutUsersInput, ChurchUncheckedCreateWithoutUsersInput>
    connectOrCreate?: ChurchCreateOrConnectWithoutUsersInput
    connect?: ChurchWhereUniqueInput
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type EnumSystemRoleFieldUpdateOperationsInput = {
    set?: $Enums.SystemRole
  }

  export type NullableEnumTypePersonFieldUpdateOperationsInput = {
    set?: $Enums.TypePerson | null
  }

  export type ChurchUpdateOneWithoutUsersNestedInput = {
    create?: XOR<ChurchCreateWithoutUsersInput, ChurchUncheckedCreateWithoutUsersInput>
    connectOrCreate?: ChurchCreateOrConnectWithoutUsersInput
    upsert?: ChurchUpsertWithoutUsersInput
    disconnect?: ChurchWhereInput | boolean
    delete?: ChurchWhereInput | boolean
    connect?: ChurchWhereUniqueInput
    update?: XOR<XOR<ChurchUpdateToOneWithWhereWithoutUsersInput, ChurchUpdateWithoutUsersInput>, ChurchUncheckedUpdateWithoutUsersInput>
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type PersonCreatecontactInput = {
    set: string[]
  }

  export type ChurchCreateNestedOneWithoutPersonsInput = {
    create?: XOR<ChurchCreateWithoutPersonsInput, ChurchUncheckedCreateWithoutPersonsInput>
    connectOrCreate?: ChurchCreateOrConnectWithoutPersonsInput
    connect?: ChurchWhereUniqueInput
  }

  export type VolunteerScaleCreateNestedManyWithoutPersonInput = {
    create?: XOR<VolunteerScaleCreateWithoutPersonInput, VolunteerScaleUncheckedCreateWithoutPersonInput> | VolunteerScaleCreateWithoutPersonInput[] | VolunteerScaleUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: VolunteerScaleCreateOrConnectWithoutPersonInput | VolunteerScaleCreateOrConnectWithoutPersonInput[]
    createMany?: VolunteerScaleCreateManyPersonInputEnvelope
    connect?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
  }

  export type VolunteerScaleUncheckedCreateNestedManyWithoutPersonInput = {
    create?: XOR<VolunteerScaleCreateWithoutPersonInput, VolunteerScaleUncheckedCreateWithoutPersonInput> | VolunteerScaleCreateWithoutPersonInput[] | VolunteerScaleUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: VolunteerScaleCreateOrConnectWithoutPersonInput | VolunteerScaleCreateOrConnectWithoutPersonInput[]
    createMany?: VolunteerScaleCreateManyPersonInputEnvelope
    connect?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
  }

  export type PersonUpdatecontactInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumTypePersonFieldUpdateOperationsInput = {
    set?: $Enums.TypePerson
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ChurchUpdateOneRequiredWithoutPersonsNestedInput = {
    create?: XOR<ChurchCreateWithoutPersonsInput, ChurchUncheckedCreateWithoutPersonsInput>
    connectOrCreate?: ChurchCreateOrConnectWithoutPersonsInput
    upsert?: ChurchUpsertWithoutPersonsInput
    connect?: ChurchWhereUniqueInput
    update?: XOR<XOR<ChurchUpdateToOneWithWhereWithoutPersonsInput, ChurchUpdateWithoutPersonsInput>, ChurchUncheckedUpdateWithoutPersonsInput>
  }

  export type VolunteerScaleUpdateManyWithoutPersonNestedInput = {
    create?: XOR<VolunteerScaleCreateWithoutPersonInput, VolunteerScaleUncheckedCreateWithoutPersonInput> | VolunteerScaleCreateWithoutPersonInput[] | VolunteerScaleUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: VolunteerScaleCreateOrConnectWithoutPersonInput | VolunteerScaleCreateOrConnectWithoutPersonInput[]
    upsert?: VolunteerScaleUpsertWithWhereUniqueWithoutPersonInput | VolunteerScaleUpsertWithWhereUniqueWithoutPersonInput[]
    createMany?: VolunteerScaleCreateManyPersonInputEnvelope
    set?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    disconnect?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    delete?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    connect?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    update?: VolunteerScaleUpdateWithWhereUniqueWithoutPersonInput | VolunteerScaleUpdateWithWhereUniqueWithoutPersonInput[]
    updateMany?: VolunteerScaleUpdateManyWithWhereWithoutPersonInput | VolunteerScaleUpdateManyWithWhereWithoutPersonInput[]
    deleteMany?: VolunteerScaleScalarWhereInput | VolunteerScaleScalarWhereInput[]
  }

  export type VolunteerScaleUncheckedUpdateManyWithoutPersonNestedInput = {
    create?: XOR<VolunteerScaleCreateWithoutPersonInput, VolunteerScaleUncheckedCreateWithoutPersonInput> | VolunteerScaleCreateWithoutPersonInput[] | VolunteerScaleUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: VolunteerScaleCreateOrConnectWithoutPersonInput | VolunteerScaleCreateOrConnectWithoutPersonInput[]
    upsert?: VolunteerScaleUpsertWithWhereUniqueWithoutPersonInput | VolunteerScaleUpsertWithWhereUniqueWithoutPersonInput[]
    createMany?: VolunteerScaleCreateManyPersonInputEnvelope
    set?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    disconnect?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    delete?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    connect?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    update?: VolunteerScaleUpdateWithWhereUniqueWithoutPersonInput | VolunteerScaleUpdateWithWhereUniqueWithoutPersonInput[]
    updateMany?: VolunteerScaleUpdateManyWithWhereWithoutPersonInput | VolunteerScaleUpdateManyWithWhereWithoutPersonInput[]
    deleteMany?: VolunteerScaleScalarWhereInput | VolunteerScaleScalarWhereInput[]
  }

  export type ChurchCreateNestedOneWithoutMinistriesInput = {
    create?: XOR<ChurchCreateWithoutMinistriesInput, ChurchUncheckedCreateWithoutMinistriesInput>
    connectOrCreate?: ChurchCreateOrConnectWithoutMinistriesInput
    connect?: ChurchWhereUniqueInput
  }

  export type VolunteerScaleCreateNestedManyWithoutMinistryInput = {
    create?: XOR<VolunteerScaleCreateWithoutMinistryInput, VolunteerScaleUncheckedCreateWithoutMinistryInput> | VolunteerScaleCreateWithoutMinistryInput[] | VolunteerScaleUncheckedCreateWithoutMinistryInput[]
    connectOrCreate?: VolunteerScaleCreateOrConnectWithoutMinistryInput | VolunteerScaleCreateOrConnectWithoutMinistryInput[]
    createMany?: VolunteerScaleCreateManyMinistryInputEnvelope
    connect?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
  }

  export type VolunteerScaleUncheckedCreateNestedManyWithoutMinistryInput = {
    create?: XOR<VolunteerScaleCreateWithoutMinistryInput, VolunteerScaleUncheckedCreateWithoutMinistryInput> | VolunteerScaleCreateWithoutMinistryInput[] | VolunteerScaleUncheckedCreateWithoutMinistryInput[]
    connectOrCreate?: VolunteerScaleCreateOrConnectWithoutMinistryInput | VolunteerScaleCreateOrConnectWithoutMinistryInput[]
    createMany?: VolunteerScaleCreateManyMinistryInputEnvelope
    connect?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
  }

  export type ChurchUpdateOneRequiredWithoutMinistriesNestedInput = {
    create?: XOR<ChurchCreateWithoutMinistriesInput, ChurchUncheckedCreateWithoutMinistriesInput>
    connectOrCreate?: ChurchCreateOrConnectWithoutMinistriesInput
    upsert?: ChurchUpsertWithoutMinistriesInput
    connect?: ChurchWhereUniqueInput
    update?: XOR<XOR<ChurchUpdateToOneWithWhereWithoutMinistriesInput, ChurchUpdateWithoutMinistriesInput>, ChurchUncheckedUpdateWithoutMinistriesInput>
  }

  export type VolunteerScaleUpdateManyWithoutMinistryNestedInput = {
    create?: XOR<VolunteerScaleCreateWithoutMinistryInput, VolunteerScaleUncheckedCreateWithoutMinistryInput> | VolunteerScaleCreateWithoutMinistryInput[] | VolunteerScaleUncheckedCreateWithoutMinistryInput[]
    connectOrCreate?: VolunteerScaleCreateOrConnectWithoutMinistryInput | VolunteerScaleCreateOrConnectWithoutMinistryInput[]
    upsert?: VolunteerScaleUpsertWithWhereUniqueWithoutMinistryInput | VolunteerScaleUpsertWithWhereUniqueWithoutMinistryInput[]
    createMany?: VolunteerScaleCreateManyMinistryInputEnvelope
    set?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    disconnect?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    delete?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    connect?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    update?: VolunteerScaleUpdateWithWhereUniqueWithoutMinistryInput | VolunteerScaleUpdateWithWhereUniqueWithoutMinistryInput[]
    updateMany?: VolunteerScaleUpdateManyWithWhereWithoutMinistryInput | VolunteerScaleUpdateManyWithWhereWithoutMinistryInput[]
    deleteMany?: VolunteerScaleScalarWhereInput | VolunteerScaleScalarWhereInput[]
  }

  export type VolunteerScaleUncheckedUpdateManyWithoutMinistryNestedInput = {
    create?: XOR<VolunteerScaleCreateWithoutMinistryInput, VolunteerScaleUncheckedCreateWithoutMinistryInput> | VolunteerScaleCreateWithoutMinistryInput[] | VolunteerScaleUncheckedCreateWithoutMinistryInput[]
    connectOrCreate?: VolunteerScaleCreateOrConnectWithoutMinistryInput | VolunteerScaleCreateOrConnectWithoutMinistryInput[]
    upsert?: VolunteerScaleUpsertWithWhereUniqueWithoutMinistryInput | VolunteerScaleUpsertWithWhereUniqueWithoutMinistryInput[]
    createMany?: VolunteerScaleCreateManyMinistryInputEnvelope
    set?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    disconnect?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    delete?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    connect?: VolunteerScaleWhereUniqueInput | VolunteerScaleWhereUniqueInput[]
    update?: VolunteerScaleUpdateWithWhereUniqueWithoutMinistryInput | VolunteerScaleUpdateWithWhereUniqueWithoutMinistryInput[]
    updateMany?: VolunteerScaleUpdateManyWithWhereWithoutMinistryInput | VolunteerScaleUpdateManyWithWhereWithoutMinistryInput[]
    deleteMany?: VolunteerScaleScalarWhereInput | VolunteerScaleScalarWhereInput[]
  }

  export type PersonCreateNestedOneWithoutVolunteerScalesInput = {
    create?: XOR<PersonCreateWithoutVolunteerScalesInput, PersonUncheckedCreateWithoutVolunteerScalesInput>
    connectOrCreate?: PersonCreateOrConnectWithoutVolunteerScalesInput
    connect?: PersonWhereUniqueInput
  }

  export type MinistryCreateNestedOneWithoutScalesInput = {
    create?: XOR<MinistryCreateWithoutScalesInput, MinistryUncheckedCreateWithoutScalesInput>
    connectOrCreate?: MinistryCreateOrConnectWithoutScalesInput
    connect?: MinistryWhereUniqueInput
  }

  export type ChurchCreateNestedOneWithoutVolunteerScalesInput = {
    create?: XOR<ChurchCreateWithoutVolunteerScalesInput, ChurchUncheckedCreateWithoutVolunteerScalesInput>
    connectOrCreate?: ChurchCreateOrConnectWithoutVolunteerScalesInput
    connect?: ChurchWhereUniqueInput
  }

  export type PersonUpdateOneRequiredWithoutVolunteerScalesNestedInput = {
    create?: XOR<PersonCreateWithoutVolunteerScalesInput, PersonUncheckedCreateWithoutVolunteerScalesInput>
    connectOrCreate?: PersonCreateOrConnectWithoutVolunteerScalesInput
    upsert?: PersonUpsertWithoutVolunteerScalesInput
    connect?: PersonWhereUniqueInput
    update?: XOR<XOR<PersonUpdateToOneWithWhereWithoutVolunteerScalesInput, PersonUpdateWithoutVolunteerScalesInput>, PersonUncheckedUpdateWithoutVolunteerScalesInput>
  }

  export type MinistryUpdateOneRequiredWithoutScalesNestedInput = {
    create?: XOR<MinistryCreateWithoutScalesInput, MinistryUncheckedCreateWithoutScalesInput>
    connectOrCreate?: MinistryCreateOrConnectWithoutScalesInput
    upsert?: MinistryUpsertWithoutScalesInput
    connect?: MinistryWhereUniqueInput
    update?: XOR<XOR<MinistryUpdateToOneWithWhereWithoutScalesInput, MinistryUpdateWithoutScalesInput>, MinistryUncheckedUpdateWithoutScalesInput>
  }

  export type ChurchUpdateOneRequiredWithoutVolunteerScalesNestedInput = {
    create?: XOR<ChurchCreateWithoutVolunteerScalesInput, ChurchUncheckedCreateWithoutVolunteerScalesInput>
    connectOrCreate?: ChurchCreateOrConnectWithoutVolunteerScalesInput
    upsert?: ChurchUpsertWithoutVolunteerScalesInput
    connect?: ChurchWhereUniqueInput
    update?: XOR<XOR<ChurchUpdateToOneWithWhereWithoutVolunteerScalesInput, ChurchUpdateWithoutVolunteerScalesInput>, ChurchUncheckedUpdateWithoutVolunteerScalesInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumEntryTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EntryType | EnumEntryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEntryTypeFilter<$PrismaModel> | $Enums.EntryType
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumEntryTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EntryType | EnumEntryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEntryTypeWithAggregatesFilter<$PrismaModel> | $Enums.EntryType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEntryTypeFilter<$PrismaModel>
    _max?: NestedEnumEntryTypeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumDayOfWeekFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekFilter<$PrismaModel> | $Enums.DayOfWeek
  }

  export type NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel> | $Enums.DayOfWeek
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDayOfWeekFilter<$PrismaModel>
    _max?: NestedEnumDayOfWeekFilter<$PrismaModel>
  }

  export type NestedEnumSystemRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.SystemRole | EnumSystemRoleFieldRefInput<$PrismaModel>
    in?: $Enums.SystemRole[] | ListEnumSystemRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.SystemRole[] | ListEnumSystemRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumSystemRoleFilter<$PrismaModel> | $Enums.SystemRole
  }

  export type NestedEnumTypePersonNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.TypePerson | EnumTypePersonFieldRefInput<$PrismaModel> | null
    in?: $Enums.TypePerson[] | ListEnumTypePersonFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TypePerson[] | ListEnumTypePersonFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTypePersonNullableFilter<$PrismaModel> | $Enums.TypePerson | null
  }

  export type NestedEnumSystemRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SystemRole | EnumSystemRoleFieldRefInput<$PrismaModel>
    in?: $Enums.SystemRole[] | ListEnumSystemRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.SystemRole[] | ListEnumSystemRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumSystemRoleWithAggregatesFilter<$PrismaModel> | $Enums.SystemRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSystemRoleFilter<$PrismaModel>
    _max?: NestedEnumSystemRoleFilter<$PrismaModel>
  }

  export type NestedEnumTypePersonNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypePerson | EnumTypePersonFieldRefInput<$PrismaModel> | null
    in?: $Enums.TypePerson[] | ListEnumTypePersonFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TypePerson[] | ListEnumTypePersonFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTypePersonNullableWithAggregatesFilter<$PrismaModel> | $Enums.TypePerson | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumTypePersonNullableFilter<$PrismaModel>
    _max?: NestedEnumTypePersonNullableFilter<$PrismaModel>
  }

  export type NestedEnumTypePersonFilter<$PrismaModel = never> = {
    equals?: $Enums.TypePerson | EnumTypePersonFieldRefInput<$PrismaModel>
    in?: $Enums.TypePerson[] | ListEnumTypePersonFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypePerson[] | ListEnumTypePersonFieldRefInput<$PrismaModel>
    not?: NestedEnumTypePersonFilter<$PrismaModel> | $Enums.TypePerson
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumTypePersonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypePerson | EnumTypePersonFieldRefInput<$PrismaModel>
    in?: $Enums.TypePerson[] | ListEnumTypePersonFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypePerson[] | ListEnumTypePersonFieldRefInput<$PrismaModel>
    not?: NestedEnumTypePersonWithAggregatesFilter<$PrismaModel> | $Enums.TypePerson
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTypePersonFilter<$PrismaModel>
    _max?: NestedEnumTypePersonFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserCreateWithoutYouChurchInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.SystemRole
    status?: $Enums.TypePerson | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutYouChurchInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.SystemRole
    status?: $Enums.TypePerson | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutYouChurchInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutYouChurchInput, UserUncheckedCreateWithoutYouChurchInput>
  }

  export type UserCreateManyYouChurchInputEnvelope = {
    data: UserCreateManyYouChurchInput | UserCreateManyYouChurchInput[]
    skipDuplicates?: boolean
  }

  export type PersonCreateWithoutYouChurchInput = {
    id?: string
    name: string
    email?: string | null
    contact?: PersonCreatecontactInput | string[]
    address?: string | null
    birthday?: string | null
    type?: $Enums.TypePerson
    profileImage?: string | null
    ministry?: string | null
    role?: string | null
    notes?: string | null
    firstVisitAt?: Date | string | null
    onboardingDraft?: NullableJsonNullValueInput | InputJsonValue
    onboardingCompletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    volunteerScales?: VolunteerScaleCreateNestedManyWithoutPersonInput
  }

  export type PersonUncheckedCreateWithoutYouChurchInput = {
    id?: string
    name: string
    email?: string | null
    contact?: PersonCreatecontactInput | string[]
    address?: string | null
    birthday?: string | null
    type?: $Enums.TypePerson
    profileImage?: string | null
    ministry?: string | null
    role?: string | null
    notes?: string | null
    firstVisitAt?: Date | string | null
    onboardingDraft?: NullableJsonNullValueInput | InputJsonValue
    onboardingCompletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    volunteerScales?: VolunteerScaleUncheckedCreateNestedManyWithoutPersonInput
  }

  export type PersonCreateOrConnectWithoutYouChurchInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutYouChurchInput, PersonUncheckedCreateWithoutYouChurchInput>
  }

  export type PersonCreateManyYouChurchInputEnvelope = {
    data: PersonCreateManyYouChurchInput | PersonCreateManyYouChurchInput[]
    skipDuplicates?: boolean
  }

  export type ChurchLinkCreateWithoutChurchInput = {
    id?: string
    title: string
    url: string
    icon?: string | null
    active?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChurchLinkUncheckedCreateWithoutChurchInput = {
    id?: string
    title: string
    url: string
    icon?: string | null
    active?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChurchLinkCreateOrConnectWithoutChurchInput = {
    where: ChurchLinkWhereUniqueInput
    create: XOR<ChurchLinkCreateWithoutChurchInput, ChurchLinkUncheckedCreateWithoutChurchInput>
  }

  export type ChurchLinkCreateManyChurchInputEnvelope = {
    data: ChurchLinkCreateManyChurchInput | ChurchLinkCreateManyChurchInput[]
    skipDuplicates?: boolean
  }

  export type WeeklyScheduleCreateWithoutChurchInput = {
    id?: string
    title: string
    dayOfWeek: $Enums.DayOfWeek
    time: string
    description?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeeklyScheduleUncheckedCreateWithoutChurchInput = {
    id?: string
    title: string
    dayOfWeek: $Enums.DayOfWeek
    time: string
    description?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeeklyScheduleCreateOrConnectWithoutChurchInput = {
    where: WeeklyScheduleWhereUniqueInput
    create: XOR<WeeklyScheduleCreateWithoutChurchInput, WeeklyScheduleUncheckedCreateWithoutChurchInput>
  }

  export type WeeklyScheduleCreateManyChurchInputEnvelope = {
    data: WeeklyScheduleCreateManyChurchInput | WeeklyScheduleCreateManyChurchInput[]
    skipDuplicates?: boolean
  }

  export type MinistryCreateWithoutChurchInput = {
    id?: string
    name: string
    description?: string | null
    icon?: string | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    scales?: VolunteerScaleCreateNestedManyWithoutMinistryInput
  }

  export type MinistryUncheckedCreateWithoutChurchInput = {
    id?: string
    name: string
    description?: string | null
    icon?: string | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    scales?: VolunteerScaleUncheckedCreateNestedManyWithoutMinistryInput
  }

  export type MinistryCreateOrConnectWithoutChurchInput = {
    where: MinistryWhereUniqueInput
    create: XOR<MinistryCreateWithoutChurchInput, MinistryUncheckedCreateWithoutChurchInput>
  }

  export type MinistryCreateManyChurchInputEnvelope = {
    data: MinistryCreateManyChurchInput | MinistryCreateManyChurchInput[]
    skipDuplicates?: boolean
  }

  export type VolunteerScaleCreateWithoutChurchInput = {
    id?: string
    date: Date | string
    role: string
    eventName?: string | null
    confirmed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    person: PersonCreateNestedOneWithoutVolunteerScalesInput
    ministry: MinistryCreateNestedOneWithoutScalesInput
  }

  export type VolunteerScaleUncheckedCreateWithoutChurchInput = {
    id?: string
    date: Date | string
    role: string
    eventName?: string | null
    confirmed?: boolean
    personId: string
    ministryId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VolunteerScaleCreateOrConnectWithoutChurchInput = {
    where: VolunteerScaleWhereUniqueInput
    create: XOR<VolunteerScaleCreateWithoutChurchInput, VolunteerScaleUncheckedCreateWithoutChurchInput>
  }

  export type VolunteerScaleCreateManyChurchInputEnvelope = {
    data: VolunteerScaleCreateManyChurchInput | VolunteerScaleCreateManyChurchInput[]
    skipDuplicates?: boolean
  }

  export type FinancialEntryCreateWithoutChurchInput = {
    id?: string
    amount: number
    category: string
    type?: $Enums.EntryType
    date?: Date | string
    donorName?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FinancialEntryUncheckedCreateWithoutChurchInput = {
    id?: string
    amount: number
    category: string
    type?: $Enums.EntryType
    date?: Date | string
    donorName?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FinancialEntryCreateOrConnectWithoutChurchInput = {
    where: FinancialEntryWhereUniqueInput
    create: XOR<FinancialEntryCreateWithoutChurchInput, FinancialEntryUncheckedCreateWithoutChurchInput>
  }

  export type FinancialEntryCreateManyChurchInputEnvelope = {
    data: FinancialEntryCreateManyChurchInput | FinancialEntryCreateManyChurchInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutYouChurchInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutYouChurchInput, UserUncheckedUpdateWithoutYouChurchInput>
    create: XOR<UserCreateWithoutYouChurchInput, UserUncheckedCreateWithoutYouChurchInput>
  }

  export type UserUpdateWithWhereUniqueWithoutYouChurchInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutYouChurchInput, UserUncheckedUpdateWithoutYouChurchInput>
  }

  export type UserUpdateManyWithWhereWithoutYouChurchInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutYouChurchInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumSystemRoleFilter<"User"> | $Enums.SystemRole
    status?: EnumTypePersonNullableFilter<"User"> | $Enums.TypePerson | null
    churchId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type PersonUpsertWithWhereUniqueWithoutYouChurchInput = {
    where: PersonWhereUniqueInput
    update: XOR<PersonUpdateWithoutYouChurchInput, PersonUncheckedUpdateWithoutYouChurchInput>
    create: XOR<PersonCreateWithoutYouChurchInput, PersonUncheckedCreateWithoutYouChurchInput>
  }

  export type PersonUpdateWithWhereUniqueWithoutYouChurchInput = {
    where: PersonWhereUniqueInput
    data: XOR<PersonUpdateWithoutYouChurchInput, PersonUncheckedUpdateWithoutYouChurchInput>
  }

  export type PersonUpdateManyWithWhereWithoutYouChurchInput = {
    where: PersonScalarWhereInput
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyWithoutYouChurchInput>
  }

  export type PersonScalarWhereInput = {
    AND?: PersonScalarWhereInput | PersonScalarWhereInput[]
    OR?: PersonScalarWhereInput[]
    NOT?: PersonScalarWhereInput | PersonScalarWhereInput[]
    id?: StringFilter<"Person"> | string
    name?: StringFilter<"Person"> | string
    email?: StringNullableFilter<"Person"> | string | null
    contact?: StringNullableListFilter<"Person">
    address?: StringNullableFilter<"Person"> | string | null
    birthday?: StringNullableFilter<"Person"> | string | null
    type?: EnumTypePersonFilter<"Person"> | $Enums.TypePerson
    profileImage?: StringNullableFilter<"Person"> | string | null
    ministry?: StringNullableFilter<"Person"> | string | null
    role?: StringNullableFilter<"Person"> | string | null
    notes?: StringNullableFilter<"Person"> | string | null
    firstVisitAt?: DateTimeNullableFilter<"Person"> | Date | string | null
    onboardingDraft?: JsonNullableFilter<"Person">
    onboardingCompletedAt?: DateTimeNullableFilter<"Person"> | Date | string | null
    churchId?: StringFilter<"Person"> | string
    createdAt?: DateTimeFilter<"Person"> | Date | string
    updatedAt?: DateTimeFilter<"Person"> | Date | string
  }

  export type ChurchLinkUpsertWithWhereUniqueWithoutChurchInput = {
    where: ChurchLinkWhereUniqueInput
    update: XOR<ChurchLinkUpdateWithoutChurchInput, ChurchLinkUncheckedUpdateWithoutChurchInput>
    create: XOR<ChurchLinkCreateWithoutChurchInput, ChurchLinkUncheckedCreateWithoutChurchInput>
  }

  export type ChurchLinkUpdateWithWhereUniqueWithoutChurchInput = {
    where: ChurchLinkWhereUniqueInput
    data: XOR<ChurchLinkUpdateWithoutChurchInput, ChurchLinkUncheckedUpdateWithoutChurchInput>
  }

  export type ChurchLinkUpdateManyWithWhereWithoutChurchInput = {
    where: ChurchLinkScalarWhereInput
    data: XOR<ChurchLinkUpdateManyMutationInput, ChurchLinkUncheckedUpdateManyWithoutChurchInput>
  }

  export type ChurchLinkScalarWhereInput = {
    AND?: ChurchLinkScalarWhereInput | ChurchLinkScalarWhereInput[]
    OR?: ChurchLinkScalarWhereInput[]
    NOT?: ChurchLinkScalarWhereInput | ChurchLinkScalarWhereInput[]
    id?: StringFilter<"ChurchLink"> | string
    title?: StringFilter<"ChurchLink"> | string
    url?: StringFilter<"ChurchLink"> | string
    icon?: StringNullableFilter<"ChurchLink"> | string | null
    active?: BoolFilter<"ChurchLink"> | boolean
    order?: IntFilter<"ChurchLink"> | number
    churchId?: StringFilter<"ChurchLink"> | string
    createdAt?: DateTimeFilter<"ChurchLink"> | Date | string
    updatedAt?: DateTimeFilter<"ChurchLink"> | Date | string
  }

  export type WeeklyScheduleUpsertWithWhereUniqueWithoutChurchInput = {
    where: WeeklyScheduleWhereUniqueInput
    update: XOR<WeeklyScheduleUpdateWithoutChurchInput, WeeklyScheduleUncheckedUpdateWithoutChurchInput>
    create: XOR<WeeklyScheduleCreateWithoutChurchInput, WeeklyScheduleUncheckedCreateWithoutChurchInput>
  }

  export type WeeklyScheduleUpdateWithWhereUniqueWithoutChurchInput = {
    where: WeeklyScheduleWhereUniqueInput
    data: XOR<WeeklyScheduleUpdateWithoutChurchInput, WeeklyScheduleUncheckedUpdateWithoutChurchInput>
  }

  export type WeeklyScheduleUpdateManyWithWhereWithoutChurchInput = {
    where: WeeklyScheduleScalarWhereInput
    data: XOR<WeeklyScheduleUpdateManyMutationInput, WeeklyScheduleUncheckedUpdateManyWithoutChurchInput>
  }

  export type WeeklyScheduleScalarWhereInput = {
    AND?: WeeklyScheduleScalarWhereInput | WeeklyScheduleScalarWhereInput[]
    OR?: WeeklyScheduleScalarWhereInput[]
    NOT?: WeeklyScheduleScalarWhereInput | WeeklyScheduleScalarWhereInput[]
    id?: StringFilter<"WeeklySchedule"> | string
    title?: StringFilter<"WeeklySchedule"> | string
    dayOfWeek?: EnumDayOfWeekFilter<"WeeklySchedule"> | $Enums.DayOfWeek
    time?: StringFilter<"WeeklySchedule"> | string
    description?: StringNullableFilter<"WeeklySchedule"> | string | null
    active?: BoolFilter<"WeeklySchedule"> | boolean
    churchId?: StringFilter<"WeeklySchedule"> | string
    createdAt?: DateTimeFilter<"WeeklySchedule"> | Date | string
    updatedAt?: DateTimeFilter<"WeeklySchedule"> | Date | string
  }

  export type MinistryUpsertWithWhereUniqueWithoutChurchInput = {
    where: MinistryWhereUniqueInput
    update: XOR<MinistryUpdateWithoutChurchInput, MinistryUncheckedUpdateWithoutChurchInput>
    create: XOR<MinistryCreateWithoutChurchInput, MinistryUncheckedCreateWithoutChurchInput>
  }

  export type MinistryUpdateWithWhereUniqueWithoutChurchInput = {
    where: MinistryWhereUniqueInput
    data: XOR<MinistryUpdateWithoutChurchInput, MinistryUncheckedUpdateWithoutChurchInput>
  }

  export type MinistryUpdateManyWithWhereWithoutChurchInput = {
    where: MinistryScalarWhereInput
    data: XOR<MinistryUpdateManyMutationInput, MinistryUncheckedUpdateManyWithoutChurchInput>
  }

  export type MinistryScalarWhereInput = {
    AND?: MinistryScalarWhereInput | MinistryScalarWhereInput[]
    OR?: MinistryScalarWhereInput[]
    NOT?: MinistryScalarWhereInput | MinistryScalarWhereInput[]
    id?: StringFilter<"Ministry"> | string
    name?: StringFilter<"Ministry"> | string
    description?: StringNullableFilter<"Ministry"> | string | null
    icon?: StringNullableFilter<"Ministry"> | string | null
    color?: StringNullableFilter<"Ministry"> | string | null
    churchId?: StringFilter<"Ministry"> | string
    createdAt?: DateTimeFilter<"Ministry"> | Date | string
    updatedAt?: DateTimeFilter<"Ministry"> | Date | string
  }

  export type VolunteerScaleUpsertWithWhereUniqueWithoutChurchInput = {
    where: VolunteerScaleWhereUniqueInput
    update: XOR<VolunteerScaleUpdateWithoutChurchInput, VolunteerScaleUncheckedUpdateWithoutChurchInput>
    create: XOR<VolunteerScaleCreateWithoutChurchInput, VolunteerScaleUncheckedCreateWithoutChurchInput>
  }

  export type VolunteerScaleUpdateWithWhereUniqueWithoutChurchInput = {
    where: VolunteerScaleWhereUniqueInput
    data: XOR<VolunteerScaleUpdateWithoutChurchInput, VolunteerScaleUncheckedUpdateWithoutChurchInput>
  }

  export type VolunteerScaleUpdateManyWithWhereWithoutChurchInput = {
    where: VolunteerScaleScalarWhereInput
    data: XOR<VolunteerScaleUpdateManyMutationInput, VolunteerScaleUncheckedUpdateManyWithoutChurchInput>
  }

  export type VolunteerScaleScalarWhereInput = {
    AND?: VolunteerScaleScalarWhereInput | VolunteerScaleScalarWhereInput[]
    OR?: VolunteerScaleScalarWhereInput[]
    NOT?: VolunteerScaleScalarWhereInput | VolunteerScaleScalarWhereInput[]
    id?: StringFilter<"VolunteerScale"> | string
    date?: DateTimeFilter<"VolunteerScale"> | Date | string
    role?: StringFilter<"VolunteerScale"> | string
    eventName?: StringNullableFilter<"VolunteerScale"> | string | null
    confirmed?: BoolFilter<"VolunteerScale"> | boolean
    personId?: StringFilter<"VolunteerScale"> | string
    ministryId?: StringFilter<"VolunteerScale"> | string
    churchId?: StringFilter<"VolunteerScale"> | string
    createdAt?: DateTimeFilter<"VolunteerScale"> | Date | string
    updatedAt?: DateTimeFilter<"VolunteerScale"> | Date | string
  }

  export type FinancialEntryUpsertWithWhereUniqueWithoutChurchInput = {
    where: FinancialEntryWhereUniqueInput
    update: XOR<FinancialEntryUpdateWithoutChurchInput, FinancialEntryUncheckedUpdateWithoutChurchInput>
    create: XOR<FinancialEntryCreateWithoutChurchInput, FinancialEntryUncheckedCreateWithoutChurchInput>
  }

  export type FinancialEntryUpdateWithWhereUniqueWithoutChurchInput = {
    where: FinancialEntryWhereUniqueInput
    data: XOR<FinancialEntryUpdateWithoutChurchInput, FinancialEntryUncheckedUpdateWithoutChurchInput>
  }

  export type FinancialEntryUpdateManyWithWhereWithoutChurchInput = {
    where: FinancialEntryScalarWhereInput
    data: XOR<FinancialEntryUpdateManyMutationInput, FinancialEntryUncheckedUpdateManyWithoutChurchInput>
  }

  export type FinancialEntryScalarWhereInput = {
    AND?: FinancialEntryScalarWhereInput | FinancialEntryScalarWhereInput[]
    OR?: FinancialEntryScalarWhereInput[]
    NOT?: FinancialEntryScalarWhereInput | FinancialEntryScalarWhereInput[]
    id?: StringFilter<"FinancialEntry"> | string
    amount?: FloatFilter<"FinancialEntry"> | number
    category?: StringFilter<"FinancialEntry"> | string
    type?: EnumEntryTypeFilter<"FinancialEntry"> | $Enums.EntryType
    date?: DateTimeFilter<"FinancialEntry"> | Date | string
    donorName?: StringNullableFilter<"FinancialEntry"> | string | null
    description?: StringNullableFilter<"FinancialEntry"> | string | null
    churchId?: StringFilter<"FinancialEntry"> | string
    createdAt?: DateTimeFilter<"FinancialEntry"> | Date | string
    updatedAt?: DateTimeFilter<"FinancialEntry"> | Date | string
  }

  export type ChurchCreateWithoutFinancialEntriesInput = {
    id?: string
    name: string
    label: string
    address: string
    contact?: ChurchCreatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: string | null
    pixKeyValue?: string | null
    pixCopyPaste?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutYouChurchInput
    persons?: PersonCreateNestedManyWithoutYouChurchInput
    links?: ChurchLinkCreateNestedManyWithoutChurchInput
    schedules?: WeeklyScheduleCreateNestedManyWithoutChurchInput
    ministries?: MinistryCreateNestedManyWithoutChurchInput
    volunteerScales?: VolunteerScaleCreateNestedManyWithoutChurchInput
  }

  export type ChurchUncheckedCreateWithoutFinancialEntriesInput = {
    id?: string
    name: string
    label: string
    address: string
    contact?: ChurchCreatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: string | null
    pixKeyValue?: string | null
    pixCopyPaste?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutYouChurchInput
    persons?: PersonUncheckedCreateNestedManyWithoutYouChurchInput
    links?: ChurchLinkUncheckedCreateNestedManyWithoutChurchInput
    schedules?: WeeklyScheduleUncheckedCreateNestedManyWithoutChurchInput
    ministries?: MinistryUncheckedCreateNestedManyWithoutChurchInput
    volunteerScales?: VolunteerScaleUncheckedCreateNestedManyWithoutChurchInput
  }

  export type ChurchCreateOrConnectWithoutFinancialEntriesInput = {
    where: ChurchWhereUniqueInput
    create: XOR<ChurchCreateWithoutFinancialEntriesInput, ChurchUncheckedCreateWithoutFinancialEntriesInput>
  }

  export type ChurchUpsertWithoutFinancialEntriesInput = {
    update: XOR<ChurchUpdateWithoutFinancialEntriesInput, ChurchUncheckedUpdateWithoutFinancialEntriesInput>
    create: XOR<ChurchCreateWithoutFinancialEntriesInput, ChurchUncheckedCreateWithoutFinancialEntriesInput>
    where?: ChurchWhereInput
  }

  export type ChurchUpdateToOneWithWhereWithoutFinancialEntriesInput = {
    where?: ChurchWhereInput
    data: XOR<ChurchUpdateWithoutFinancialEntriesInput, ChurchUncheckedUpdateWithoutFinancialEntriesInput>
  }

  export type ChurchUpdateWithoutFinancialEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contact?: ChurchUpdatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: NullableStringFieldUpdateOperationsInput | string | null
    pixKeyValue?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutYouChurchNestedInput
    persons?: PersonUpdateManyWithoutYouChurchNestedInput
    links?: ChurchLinkUpdateManyWithoutChurchNestedInput
    schedules?: WeeklyScheduleUpdateManyWithoutChurchNestedInput
    ministries?: MinistryUpdateManyWithoutChurchNestedInput
    volunteerScales?: VolunteerScaleUpdateManyWithoutChurchNestedInput
  }

  export type ChurchUncheckedUpdateWithoutFinancialEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contact?: ChurchUpdatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: NullableStringFieldUpdateOperationsInput | string | null
    pixKeyValue?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutYouChurchNestedInput
    persons?: PersonUncheckedUpdateManyWithoutYouChurchNestedInput
    links?: ChurchLinkUncheckedUpdateManyWithoutChurchNestedInput
    schedules?: WeeklyScheduleUncheckedUpdateManyWithoutChurchNestedInput
    ministries?: MinistryUncheckedUpdateManyWithoutChurchNestedInput
    volunteerScales?: VolunteerScaleUncheckedUpdateManyWithoutChurchNestedInput
  }

  export type ChurchCreateWithoutLinksInput = {
    id?: string
    name: string
    label: string
    address: string
    contact?: ChurchCreatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: string | null
    pixKeyValue?: string | null
    pixCopyPaste?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutYouChurchInput
    persons?: PersonCreateNestedManyWithoutYouChurchInput
    schedules?: WeeklyScheduleCreateNestedManyWithoutChurchInput
    ministries?: MinistryCreateNestedManyWithoutChurchInput
    volunteerScales?: VolunteerScaleCreateNestedManyWithoutChurchInput
    financialEntries?: FinancialEntryCreateNestedManyWithoutChurchInput
  }

  export type ChurchUncheckedCreateWithoutLinksInput = {
    id?: string
    name: string
    label: string
    address: string
    contact?: ChurchCreatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: string | null
    pixKeyValue?: string | null
    pixCopyPaste?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutYouChurchInput
    persons?: PersonUncheckedCreateNestedManyWithoutYouChurchInput
    schedules?: WeeklyScheduleUncheckedCreateNestedManyWithoutChurchInput
    ministries?: MinistryUncheckedCreateNestedManyWithoutChurchInput
    volunteerScales?: VolunteerScaleUncheckedCreateNestedManyWithoutChurchInput
    financialEntries?: FinancialEntryUncheckedCreateNestedManyWithoutChurchInput
  }

  export type ChurchCreateOrConnectWithoutLinksInput = {
    where: ChurchWhereUniqueInput
    create: XOR<ChurchCreateWithoutLinksInput, ChurchUncheckedCreateWithoutLinksInput>
  }

  export type ChurchUpsertWithoutLinksInput = {
    update: XOR<ChurchUpdateWithoutLinksInput, ChurchUncheckedUpdateWithoutLinksInput>
    create: XOR<ChurchCreateWithoutLinksInput, ChurchUncheckedCreateWithoutLinksInput>
    where?: ChurchWhereInput
  }

  export type ChurchUpdateToOneWithWhereWithoutLinksInput = {
    where?: ChurchWhereInput
    data: XOR<ChurchUpdateWithoutLinksInput, ChurchUncheckedUpdateWithoutLinksInput>
  }

  export type ChurchUpdateWithoutLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contact?: ChurchUpdatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: NullableStringFieldUpdateOperationsInput | string | null
    pixKeyValue?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutYouChurchNestedInput
    persons?: PersonUpdateManyWithoutYouChurchNestedInput
    schedules?: WeeklyScheduleUpdateManyWithoutChurchNestedInput
    ministries?: MinistryUpdateManyWithoutChurchNestedInput
    volunteerScales?: VolunteerScaleUpdateManyWithoutChurchNestedInput
    financialEntries?: FinancialEntryUpdateManyWithoutChurchNestedInput
  }

  export type ChurchUncheckedUpdateWithoutLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contact?: ChurchUpdatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: NullableStringFieldUpdateOperationsInput | string | null
    pixKeyValue?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutYouChurchNestedInput
    persons?: PersonUncheckedUpdateManyWithoutYouChurchNestedInput
    schedules?: WeeklyScheduleUncheckedUpdateManyWithoutChurchNestedInput
    ministries?: MinistryUncheckedUpdateManyWithoutChurchNestedInput
    volunteerScales?: VolunteerScaleUncheckedUpdateManyWithoutChurchNestedInput
    financialEntries?: FinancialEntryUncheckedUpdateManyWithoutChurchNestedInput
  }

  export type ChurchCreateWithoutSchedulesInput = {
    id?: string
    name: string
    label: string
    address: string
    contact?: ChurchCreatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: string | null
    pixKeyValue?: string | null
    pixCopyPaste?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutYouChurchInput
    persons?: PersonCreateNestedManyWithoutYouChurchInput
    links?: ChurchLinkCreateNestedManyWithoutChurchInput
    ministries?: MinistryCreateNestedManyWithoutChurchInput
    volunteerScales?: VolunteerScaleCreateNestedManyWithoutChurchInput
    financialEntries?: FinancialEntryCreateNestedManyWithoutChurchInput
  }

  export type ChurchUncheckedCreateWithoutSchedulesInput = {
    id?: string
    name: string
    label: string
    address: string
    contact?: ChurchCreatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: string | null
    pixKeyValue?: string | null
    pixCopyPaste?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutYouChurchInput
    persons?: PersonUncheckedCreateNestedManyWithoutYouChurchInput
    links?: ChurchLinkUncheckedCreateNestedManyWithoutChurchInput
    ministries?: MinistryUncheckedCreateNestedManyWithoutChurchInput
    volunteerScales?: VolunteerScaleUncheckedCreateNestedManyWithoutChurchInput
    financialEntries?: FinancialEntryUncheckedCreateNestedManyWithoutChurchInput
  }

  export type ChurchCreateOrConnectWithoutSchedulesInput = {
    where: ChurchWhereUniqueInput
    create: XOR<ChurchCreateWithoutSchedulesInput, ChurchUncheckedCreateWithoutSchedulesInput>
  }

  export type ChurchUpsertWithoutSchedulesInput = {
    update: XOR<ChurchUpdateWithoutSchedulesInput, ChurchUncheckedUpdateWithoutSchedulesInput>
    create: XOR<ChurchCreateWithoutSchedulesInput, ChurchUncheckedCreateWithoutSchedulesInput>
    where?: ChurchWhereInput
  }

  export type ChurchUpdateToOneWithWhereWithoutSchedulesInput = {
    where?: ChurchWhereInput
    data: XOR<ChurchUpdateWithoutSchedulesInput, ChurchUncheckedUpdateWithoutSchedulesInput>
  }

  export type ChurchUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contact?: ChurchUpdatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: NullableStringFieldUpdateOperationsInput | string | null
    pixKeyValue?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutYouChurchNestedInput
    persons?: PersonUpdateManyWithoutYouChurchNestedInput
    links?: ChurchLinkUpdateManyWithoutChurchNestedInput
    ministries?: MinistryUpdateManyWithoutChurchNestedInput
    volunteerScales?: VolunteerScaleUpdateManyWithoutChurchNestedInput
    financialEntries?: FinancialEntryUpdateManyWithoutChurchNestedInput
  }

  export type ChurchUncheckedUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contact?: ChurchUpdatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: NullableStringFieldUpdateOperationsInput | string | null
    pixKeyValue?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutYouChurchNestedInput
    persons?: PersonUncheckedUpdateManyWithoutYouChurchNestedInput
    links?: ChurchLinkUncheckedUpdateManyWithoutChurchNestedInput
    ministries?: MinistryUncheckedUpdateManyWithoutChurchNestedInput
    volunteerScales?: VolunteerScaleUncheckedUpdateManyWithoutChurchNestedInput
    financialEntries?: FinancialEntryUncheckedUpdateManyWithoutChurchNestedInput
  }

  export type ChurchCreateWithoutUsersInput = {
    id?: string
    name: string
    label: string
    address: string
    contact?: ChurchCreatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: string | null
    pixKeyValue?: string | null
    pixCopyPaste?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    persons?: PersonCreateNestedManyWithoutYouChurchInput
    links?: ChurchLinkCreateNestedManyWithoutChurchInput
    schedules?: WeeklyScheduleCreateNestedManyWithoutChurchInput
    ministries?: MinistryCreateNestedManyWithoutChurchInput
    volunteerScales?: VolunteerScaleCreateNestedManyWithoutChurchInput
    financialEntries?: FinancialEntryCreateNestedManyWithoutChurchInput
  }

  export type ChurchUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    label: string
    address: string
    contact?: ChurchCreatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: string | null
    pixKeyValue?: string | null
    pixCopyPaste?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    persons?: PersonUncheckedCreateNestedManyWithoutYouChurchInput
    links?: ChurchLinkUncheckedCreateNestedManyWithoutChurchInput
    schedules?: WeeklyScheduleUncheckedCreateNestedManyWithoutChurchInput
    ministries?: MinistryUncheckedCreateNestedManyWithoutChurchInput
    volunteerScales?: VolunteerScaleUncheckedCreateNestedManyWithoutChurchInput
    financialEntries?: FinancialEntryUncheckedCreateNestedManyWithoutChurchInput
  }

  export type ChurchCreateOrConnectWithoutUsersInput = {
    where: ChurchWhereUniqueInput
    create: XOR<ChurchCreateWithoutUsersInput, ChurchUncheckedCreateWithoutUsersInput>
  }

  export type SessionCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ChurchUpsertWithoutUsersInput = {
    update: XOR<ChurchUpdateWithoutUsersInput, ChurchUncheckedUpdateWithoutUsersInput>
    create: XOR<ChurchCreateWithoutUsersInput, ChurchUncheckedCreateWithoutUsersInput>
    where?: ChurchWhereInput
  }

  export type ChurchUpdateToOneWithWhereWithoutUsersInput = {
    where?: ChurchWhereInput
    data: XOR<ChurchUpdateWithoutUsersInput, ChurchUncheckedUpdateWithoutUsersInput>
  }

  export type ChurchUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contact?: ChurchUpdatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: NullableStringFieldUpdateOperationsInput | string | null
    pixKeyValue?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    persons?: PersonUpdateManyWithoutYouChurchNestedInput
    links?: ChurchLinkUpdateManyWithoutChurchNestedInput
    schedules?: WeeklyScheduleUpdateManyWithoutChurchNestedInput
    ministries?: MinistryUpdateManyWithoutChurchNestedInput
    volunteerScales?: VolunteerScaleUpdateManyWithoutChurchNestedInput
    financialEntries?: FinancialEntryUpdateManyWithoutChurchNestedInput
  }

  export type ChurchUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contact?: ChurchUpdatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: NullableStringFieldUpdateOperationsInput | string | null
    pixKeyValue?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    persons?: PersonUncheckedUpdateManyWithoutYouChurchNestedInput
    links?: ChurchLinkUncheckedUpdateManyWithoutChurchNestedInput
    schedules?: WeeklyScheduleUncheckedUpdateManyWithoutChurchNestedInput
    ministries?: MinistryUncheckedUpdateManyWithoutChurchNestedInput
    volunteerScales?: VolunteerScaleUncheckedUpdateManyWithoutChurchNestedInput
    financialEntries?: FinancialEntryUncheckedUpdateManyWithoutChurchNestedInput
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type ChurchCreateWithoutPersonsInput = {
    id?: string
    name: string
    label: string
    address: string
    contact?: ChurchCreatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: string | null
    pixKeyValue?: string | null
    pixCopyPaste?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutYouChurchInput
    links?: ChurchLinkCreateNestedManyWithoutChurchInput
    schedules?: WeeklyScheduleCreateNestedManyWithoutChurchInput
    ministries?: MinistryCreateNestedManyWithoutChurchInput
    volunteerScales?: VolunteerScaleCreateNestedManyWithoutChurchInput
    financialEntries?: FinancialEntryCreateNestedManyWithoutChurchInput
  }

  export type ChurchUncheckedCreateWithoutPersonsInput = {
    id?: string
    name: string
    label: string
    address: string
    contact?: ChurchCreatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: string | null
    pixKeyValue?: string | null
    pixCopyPaste?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutYouChurchInput
    links?: ChurchLinkUncheckedCreateNestedManyWithoutChurchInput
    schedules?: WeeklyScheduleUncheckedCreateNestedManyWithoutChurchInput
    ministries?: MinistryUncheckedCreateNestedManyWithoutChurchInput
    volunteerScales?: VolunteerScaleUncheckedCreateNestedManyWithoutChurchInput
    financialEntries?: FinancialEntryUncheckedCreateNestedManyWithoutChurchInput
  }

  export type ChurchCreateOrConnectWithoutPersonsInput = {
    where: ChurchWhereUniqueInput
    create: XOR<ChurchCreateWithoutPersonsInput, ChurchUncheckedCreateWithoutPersonsInput>
  }

  export type VolunteerScaleCreateWithoutPersonInput = {
    id?: string
    date: Date | string
    role: string
    eventName?: string | null
    confirmed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ministry: MinistryCreateNestedOneWithoutScalesInput
    church: ChurchCreateNestedOneWithoutVolunteerScalesInput
  }

  export type VolunteerScaleUncheckedCreateWithoutPersonInput = {
    id?: string
    date: Date | string
    role: string
    eventName?: string | null
    confirmed?: boolean
    ministryId: string
    churchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VolunteerScaleCreateOrConnectWithoutPersonInput = {
    where: VolunteerScaleWhereUniqueInput
    create: XOR<VolunteerScaleCreateWithoutPersonInput, VolunteerScaleUncheckedCreateWithoutPersonInput>
  }

  export type VolunteerScaleCreateManyPersonInputEnvelope = {
    data: VolunteerScaleCreateManyPersonInput | VolunteerScaleCreateManyPersonInput[]
    skipDuplicates?: boolean
  }

  export type ChurchUpsertWithoutPersonsInput = {
    update: XOR<ChurchUpdateWithoutPersonsInput, ChurchUncheckedUpdateWithoutPersonsInput>
    create: XOR<ChurchCreateWithoutPersonsInput, ChurchUncheckedCreateWithoutPersonsInput>
    where?: ChurchWhereInput
  }

  export type ChurchUpdateToOneWithWhereWithoutPersonsInput = {
    where?: ChurchWhereInput
    data: XOR<ChurchUpdateWithoutPersonsInput, ChurchUncheckedUpdateWithoutPersonsInput>
  }

  export type ChurchUpdateWithoutPersonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contact?: ChurchUpdatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: NullableStringFieldUpdateOperationsInput | string | null
    pixKeyValue?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutYouChurchNestedInput
    links?: ChurchLinkUpdateManyWithoutChurchNestedInput
    schedules?: WeeklyScheduleUpdateManyWithoutChurchNestedInput
    ministries?: MinistryUpdateManyWithoutChurchNestedInput
    volunteerScales?: VolunteerScaleUpdateManyWithoutChurchNestedInput
    financialEntries?: FinancialEntryUpdateManyWithoutChurchNestedInput
  }

  export type ChurchUncheckedUpdateWithoutPersonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contact?: ChurchUpdatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: NullableStringFieldUpdateOperationsInput | string | null
    pixKeyValue?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutYouChurchNestedInput
    links?: ChurchLinkUncheckedUpdateManyWithoutChurchNestedInput
    schedules?: WeeklyScheduleUncheckedUpdateManyWithoutChurchNestedInput
    ministries?: MinistryUncheckedUpdateManyWithoutChurchNestedInput
    volunteerScales?: VolunteerScaleUncheckedUpdateManyWithoutChurchNestedInput
    financialEntries?: FinancialEntryUncheckedUpdateManyWithoutChurchNestedInput
  }

  export type VolunteerScaleUpsertWithWhereUniqueWithoutPersonInput = {
    where: VolunteerScaleWhereUniqueInput
    update: XOR<VolunteerScaleUpdateWithoutPersonInput, VolunteerScaleUncheckedUpdateWithoutPersonInput>
    create: XOR<VolunteerScaleCreateWithoutPersonInput, VolunteerScaleUncheckedCreateWithoutPersonInput>
  }

  export type VolunteerScaleUpdateWithWhereUniqueWithoutPersonInput = {
    where: VolunteerScaleWhereUniqueInput
    data: XOR<VolunteerScaleUpdateWithoutPersonInput, VolunteerScaleUncheckedUpdateWithoutPersonInput>
  }

  export type VolunteerScaleUpdateManyWithWhereWithoutPersonInput = {
    where: VolunteerScaleScalarWhereInput
    data: XOR<VolunteerScaleUpdateManyMutationInput, VolunteerScaleUncheckedUpdateManyWithoutPersonInput>
  }

  export type ChurchCreateWithoutMinistriesInput = {
    id?: string
    name: string
    label: string
    address: string
    contact?: ChurchCreatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: string | null
    pixKeyValue?: string | null
    pixCopyPaste?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutYouChurchInput
    persons?: PersonCreateNestedManyWithoutYouChurchInput
    links?: ChurchLinkCreateNestedManyWithoutChurchInput
    schedules?: WeeklyScheduleCreateNestedManyWithoutChurchInput
    volunteerScales?: VolunteerScaleCreateNestedManyWithoutChurchInput
    financialEntries?: FinancialEntryCreateNestedManyWithoutChurchInput
  }

  export type ChurchUncheckedCreateWithoutMinistriesInput = {
    id?: string
    name: string
    label: string
    address: string
    contact?: ChurchCreatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: string | null
    pixKeyValue?: string | null
    pixCopyPaste?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutYouChurchInput
    persons?: PersonUncheckedCreateNestedManyWithoutYouChurchInput
    links?: ChurchLinkUncheckedCreateNestedManyWithoutChurchInput
    schedules?: WeeklyScheduleUncheckedCreateNestedManyWithoutChurchInput
    volunteerScales?: VolunteerScaleUncheckedCreateNestedManyWithoutChurchInput
    financialEntries?: FinancialEntryUncheckedCreateNestedManyWithoutChurchInput
  }

  export type ChurchCreateOrConnectWithoutMinistriesInput = {
    where: ChurchWhereUniqueInput
    create: XOR<ChurchCreateWithoutMinistriesInput, ChurchUncheckedCreateWithoutMinistriesInput>
  }

  export type VolunteerScaleCreateWithoutMinistryInput = {
    id?: string
    date: Date | string
    role: string
    eventName?: string | null
    confirmed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    person: PersonCreateNestedOneWithoutVolunteerScalesInput
    church: ChurchCreateNestedOneWithoutVolunteerScalesInput
  }

  export type VolunteerScaleUncheckedCreateWithoutMinistryInput = {
    id?: string
    date: Date | string
    role: string
    eventName?: string | null
    confirmed?: boolean
    personId: string
    churchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VolunteerScaleCreateOrConnectWithoutMinistryInput = {
    where: VolunteerScaleWhereUniqueInput
    create: XOR<VolunteerScaleCreateWithoutMinistryInput, VolunteerScaleUncheckedCreateWithoutMinistryInput>
  }

  export type VolunteerScaleCreateManyMinistryInputEnvelope = {
    data: VolunteerScaleCreateManyMinistryInput | VolunteerScaleCreateManyMinistryInput[]
    skipDuplicates?: boolean
  }

  export type ChurchUpsertWithoutMinistriesInput = {
    update: XOR<ChurchUpdateWithoutMinistriesInput, ChurchUncheckedUpdateWithoutMinistriesInput>
    create: XOR<ChurchCreateWithoutMinistriesInput, ChurchUncheckedCreateWithoutMinistriesInput>
    where?: ChurchWhereInput
  }

  export type ChurchUpdateToOneWithWhereWithoutMinistriesInput = {
    where?: ChurchWhereInput
    data: XOR<ChurchUpdateWithoutMinistriesInput, ChurchUncheckedUpdateWithoutMinistriesInput>
  }

  export type ChurchUpdateWithoutMinistriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contact?: ChurchUpdatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: NullableStringFieldUpdateOperationsInput | string | null
    pixKeyValue?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutYouChurchNestedInput
    persons?: PersonUpdateManyWithoutYouChurchNestedInput
    links?: ChurchLinkUpdateManyWithoutChurchNestedInput
    schedules?: WeeklyScheduleUpdateManyWithoutChurchNestedInput
    volunteerScales?: VolunteerScaleUpdateManyWithoutChurchNestedInput
    financialEntries?: FinancialEntryUpdateManyWithoutChurchNestedInput
  }

  export type ChurchUncheckedUpdateWithoutMinistriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contact?: ChurchUpdatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: NullableStringFieldUpdateOperationsInput | string | null
    pixKeyValue?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutYouChurchNestedInput
    persons?: PersonUncheckedUpdateManyWithoutYouChurchNestedInput
    links?: ChurchLinkUncheckedUpdateManyWithoutChurchNestedInput
    schedules?: WeeklyScheduleUncheckedUpdateManyWithoutChurchNestedInput
    volunteerScales?: VolunteerScaleUncheckedUpdateManyWithoutChurchNestedInput
    financialEntries?: FinancialEntryUncheckedUpdateManyWithoutChurchNestedInput
  }

  export type VolunteerScaleUpsertWithWhereUniqueWithoutMinistryInput = {
    where: VolunteerScaleWhereUniqueInput
    update: XOR<VolunteerScaleUpdateWithoutMinistryInput, VolunteerScaleUncheckedUpdateWithoutMinistryInput>
    create: XOR<VolunteerScaleCreateWithoutMinistryInput, VolunteerScaleUncheckedCreateWithoutMinistryInput>
  }

  export type VolunteerScaleUpdateWithWhereUniqueWithoutMinistryInput = {
    where: VolunteerScaleWhereUniqueInput
    data: XOR<VolunteerScaleUpdateWithoutMinistryInput, VolunteerScaleUncheckedUpdateWithoutMinistryInput>
  }

  export type VolunteerScaleUpdateManyWithWhereWithoutMinistryInput = {
    where: VolunteerScaleScalarWhereInput
    data: XOR<VolunteerScaleUpdateManyMutationInput, VolunteerScaleUncheckedUpdateManyWithoutMinistryInput>
  }

  export type PersonCreateWithoutVolunteerScalesInput = {
    id?: string
    name: string
    email?: string | null
    contact?: PersonCreatecontactInput | string[]
    address?: string | null
    birthday?: string | null
    type?: $Enums.TypePerson
    profileImage?: string | null
    ministry?: string | null
    role?: string | null
    notes?: string | null
    firstVisitAt?: Date | string | null
    onboardingDraft?: NullableJsonNullValueInput | InputJsonValue
    onboardingCompletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    youChurch: ChurchCreateNestedOneWithoutPersonsInput
  }

  export type PersonUncheckedCreateWithoutVolunteerScalesInput = {
    id?: string
    name: string
    email?: string | null
    contact?: PersonCreatecontactInput | string[]
    address?: string | null
    birthday?: string | null
    type?: $Enums.TypePerson
    profileImage?: string | null
    ministry?: string | null
    role?: string | null
    notes?: string | null
    firstVisitAt?: Date | string | null
    onboardingDraft?: NullableJsonNullValueInput | InputJsonValue
    onboardingCompletedAt?: Date | string | null
    churchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PersonCreateOrConnectWithoutVolunteerScalesInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutVolunteerScalesInput, PersonUncheckedCreateWithoutVolunteerScalesInput>
  }

  export type MinistryCreateWithoutScalesInput = {
    id?: string
    name: string
    description?: string | null
    icon?: string | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    church: ChurchCreateNestedOneWithoutMinistriesInput
  }

  export type MinistryUncheckedCreateWithoutScalesInput = {
    id?: string
    name: string
    description?: string | null
    icon?: string | null
    color?: string | null
    churchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MinistryCreateOrConnectWithoutScalesInput = {
    where: MinistryWhereUniqueInput
    create: XOR<MinistryCreateWithoutScalesInput, MinistryUncheckedCreateWithoutScalesInput>
  }

  export type ChurchCreateWithoutVolunteerScalesInput = {
    id?: string
    name: string
    label: string
    address: string
    contact?: ChurchCreatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: string | null
    pixKeyValue?: string | null
    pixCopyPaste?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutYouChurchInput
    persons?: PersonCreateNestedManyWithoutYouChurchInput
    links?: ChurchLinkCreateNestedManyWithoutChurchInput
    schedules?: WeeklyScheduleCreateNestedManyWithoutChurchInput
    ministries?: MinistryCreateNestedManyWithoutChurchInput
    financialEntries?: FinancialEntryCreateNestedManyWithoutChurchInput
  }

  export type ChurchUncheckedCreateWithoutVolunteerScalesInput = {
    id?: string
    name: string
    label: string
    address: string
    contact?: ChurchCreatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: string | null
    pixKeyValue?: string | null
    pixCopyPaste?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutYouChurchInput
    persons?: PersonUncheckedCreateNestedManyWithoutYouChurchInput
    links?: ChurchLinkUncheckedCreateNestedManyWithoutChurchInput
    schedules?: WeeklyScheduleUncheckedCreateNestedManyWithoutChurchInput
    ministries?: MinistryUncheckedCreateNestedManyWithoutChurchInput
    financialEntries?: FinancialEntryUncheckedCreateNestedManyWithoutChurchInput
  }

  export type ChurchCreateOrConnectWithoutVolunteerScalesInput = {
    where: ChurchWhereUniqueInput
    create: XOR<ChurchCreateWithoutVolunteerScalesInput, ChurchUncheckedCreateWithoutVolunteerScalesInput>
  }

  export type PersonUpsertWithoutVolunteerScalesInput = {
    update: XOR<PersonUpdateWithoutVolunteerScalesInput, PersonUncheckedUpdateWithoutVolunteerScalesInput>
    create: XOR<PersonCreateWithoutVolunteerScalesInput, PersonUncheckedCreateWithoutVolunteerScalesInput>
    where?: PersonWhereInput
  }

  export type PersonUpdateToOneWithWhereWithoutVolunteerScalesInput = {
    where?: PersonWhereInput
    data: XOR<PersonUpdateWithoutVolunteerScalesInput, PersonUncheckedUpdateWithoutVolunteerScalesInput>
  }

  export type PersonUpdateWithoutVolunteerScalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: PersonUpdatecontactInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypePersonFieldUpdateOperationsInput | $Enums.TypePerson
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    ministry?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    firstVisitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingDraft?: NullableJsonNullValueInput | InputJsonValue
    onboardingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    youChurch?: ChurchUpdateOneRequiredWithoutPersonsNestedInput
  }

  export type PersonUncheckedUpdateWithoutVolunteerScalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: PersonUpdatecontactInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypePersonFieldUpdateOperationsInput | $Enums.TypePerson
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    ministry?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    firstVisitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingDraft?: NullableJsonNullValueInput | InputJsonValue
    onboardingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    churchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MinistryUpsertWithoutScalesInput = {
    update: XOR<MinistryUpdateWithoutScalesInput, MinistryUncheckedUpdateWithoutScalesInput>
    create: XOR<MinistryCreateWithoutScalesInput, MinistryUncheckedCreateWithoutScalesInput>
    where?: MinistryWhereInput
  }

  export type MinistryUpdateToOneWithWhereWithoutScalesInput = {
    where?: MinistryWhereInput
    data: XOR<MinistryUpdateWithoutScalesInput, MinistryUncheckedUpdateWithoutScalesInput>
  }

  export type MinistryUpdateWithoutScalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    church?: ChurchUpdateOneRequiredWithoutMinistriesNestedInput
  }

  export type MinistryUncheckedUpdateWithoutScalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    churchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChurchUpsertWithoutVolunteerScalesInput = {
    update: XOR<ChurchUpdateWithoutVolunteerScalesInput, ChurchUncheckedUpdateWithoutVolunteerScalesInput>
    create: XOR<ChurchCreateWithoutVolunteerScalesInput, ChurchUncheckedCreateWithoutVolunteerScalesInput>
    where?: ChurchWhereInput
  }

  export type ChurchUpdateToOneWithWhereWithoutVolunteerScalesInput = {
    where?: ChurchWhereInput
    data: XOR<ChurchUpdateWithoutVolunteerScalesInput, ChurchUncheckedUpdateWithoutVolunteerScalesInput>
  }

  export type ChurchUpdateWithoutVolunteerScalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contact?: ChurchUpdatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: NullableStringFieldUpdateOperationsInput | string | null
    pixKeyValue?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutYouChurchNestedInput
    persons?: PersonUpdateManyWithoutYouChurchNestedInput
    links?: ChurchLinkUpdateManyWithoutChurchNestedInput
    schedules?: WeeklyScheduleUpdateManyWithoutChurchNestedInput
    ministries?: MinistryUpdateManyWithoutChurchNestedInput
    financialEntries?: FinancialEntryUpdateManyWithoutChurchNestedInput
  }

  export type ChurchUncheckedUpdateWithoutVolunteerScalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    contact?: ChurchUpdatecontactInput | string[]
    customization?: NullableJsonNullValueInput | InputJsonValue
    pixKeyType?: NullableStringFieldUpdateOperationsInput | string | null
    pixKeyValue?: NullableStringFieldUpdateOperationsInput | string | null
    pixCopyPaste?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutYouChurchNestedInput
    persons?: PersonUncheckedUpdateManyWithoutYouChurchNestedInput
    links?: ChurchLinkUncheckedUpdateManyWithoutChurchNestedInput
    schedules?: WeeklyScheduleUncheckedUpdateManyWithoutChurchNestedInput
    ministries?: MinistryUncheckedUpdateManyWithoutChurchNestedInput
    financialEntries?: FinancialEntryUncheckedUpdateManyWithoutChurchNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.SystemRole
    status?: $Enums.TypePerson | null
    createdAt?: Date | string
    updatedAt?: Date | string
    youChurch?: ChurchCreateNestedOneWithoutUsersInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.SystemRole
    status?: $Enums.TypePerson | null
    churchId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumSystemRoleFieldUpdateOperationsInput | $Enums.SystemRole
    status?: NullableEnumTypePersonFieldUpdateOperationsInput | $Enums.TypePerson | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    youChurch?: ChurchUpdateOneWithoutUsersNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumSystemRoleFieldUpdateOperationsInput | $Enums.SystemRole
    status?: NullableEnumTypePersonFieldUpdateOperationsInput | $Enums.TypePerson | null
    churchId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.SystemRole
    status?: $Enums.TypePerson | null
    createdAt?: Date | string
    updatedAt?: Date | string
    youChurch?: ChurchCreateNestedOneWithoutUsersInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.SystemRole
    status?: $Enums.TypePerson | null
    churchId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumSystemRoleFieldUpdateOperationsInput | $Enums.SystemRole
    status?: NullableEnumTypePersonFieldUpdateOperationsInput | $Enums.TypePerson | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    youChurch?: ChurchUpdateOneWithoutUsersNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumSystemRoleFieldUpdateOperationsInput | $Enums.SystemRole
    status?: NullableEnumTypePersonFieldUpdateOperationsInput | $Enums.TypePerson | null
    churchId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyYouChurchInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    role?: $Enums.SystemRole
    status?: $Enums.TypePerson | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PersonCreateManyYouChurchInput = {
    id?: string
    name: string
    email?: string | null
    contact?: PersonCreatecontactInput | string[]
    address?: string | null
    birthday?: string | null
    type?: $Enums.TypePerson
    profileImage?: string | null
    ministry?: string | null
    role?: string | null
    notes?: string | null
    firstVisitAt?: Date | string | null
    onboardingDraft?: NullableJsonNullValueInput | InputJsonValue
    onboardingCompletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChurchLinkCreateManyChurchInput = {
    id?: string
    title: string
    url: string
    icon?: string | null
    active?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeeklyScheduleCreateManyChurchInput = {
    id?: string
    title: string
    dayOfWeek: $Enums.DayOfWeek
    time: string
    description?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MinistryCreateManyChurchInput = {
    id?: string
    name: string
    description?: string | null
    icon?: string | null
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VolunteerScaleCreateManyChurchInput = {
    id?: string
    date: Date | string
    role: string
    eventName?: string | null
    confirmed?: boolean
    personId: string
    ministryId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FinancialEntryCreateManyChurchInput = {
    id?: string
    amount: number
    category: string
    type?: $Enums.EntryType
    date?: Date | string
    donorName?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutYouChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumSystemRoleFieldUpdateOperationsInput | $Enums.SystemRole
    status?: NullableEnumTypePersonFieldUpdateOperationsInput | $Enums.TypePerson | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutYouChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumSystemRoleFieldUpdateOperationsInput | $Enums.SystemRole
    status?: NullableEnumTypePersonFieldUpdateOperationsInput | $Enums.TypePerson | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutYouChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumSystemRoleFieldUpdateOperationsInput | $Enums.SystemRole
    status?: NullableEnumTypePersonFieldUpdateOperationsInput | $Enums.TypePerson | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonUpdateWithoutYouChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: PersonUpdatecontactInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypePersonFieldUpdateOperationsInput | $Enums.TypePerson
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    ministry?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    firstVisitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingDraft?: NullableJsonNullValueInput | InputJsonValue
    onboardingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    volunteerScales?: VolunteerScaleUpdateManyWithoutPersonNestedInput
  }

  export type PersonUncheckedUpdateWithoutYouChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: PersonUpdatecontactInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypePersonFieldUpdateOperationsInput | $Enums.TypePerson
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    ministry?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    firstVisitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingDraft?: NullableJsonNullValueInput | InputJsonValue
    onboardingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    volunteerScales?: VolunteerScaleUncheckedUpdateManyWithoutPersonNestedInput
  }

  export type PersonUncheckedUpdateManyWithoutYouChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contact?: PersonUpdatecontactInput | string[]
    address?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypePersonFieldUpdateOperationsInput | $Enums.TypePerson
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    ministry?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    firstVisitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingDraft?: NullableJsonNullValueInput | InputJsonValue
    onboardingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChurchLinkUpdateWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChurchLinkUncheckedUpdateWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChurchLinkUncheckedUpdateManyWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyScheduleUpdateWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    time?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyScheduleUncheckedUpdateWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    time?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyScheduleUncheckedUpdateManyWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    time?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MinistryUpdateWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scales?: VolunteerScaleUpdateManyWithoutMinistryNestedInput
  }

  export type MinistryUncheckedUpdateWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scales?: VolunteerScaleUncheckedUpdateManyWithoutMinistryNestedInput
  }

  export type MinistryUncheckedUpdateManyWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VolunteerScaleUpdateWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    person?: PersonUpdateOneRequiredWithoutVolunteerScalesNestedInput
    ministry?: MinistryUpdateOneRequiredWithoutScalesNestedInput
  }

  export type VolunteerScaleUncheckedUpdateWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    personId?: StringFieldUpdateOperationsInput | string
    ministryId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VolunteerScaleUncheckedUpdateManyWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    personId?: StringFieldUpdateOperationsInput | string
    ministryId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinancialEntryUpdateWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    donorName?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinancialEntryUncheckedUpdateWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    donorName?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinancialEntryUncheckedUpdateManyWithoutChurchInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    donorName?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type AccountCreateManyUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VolunteerScaleCreateManyPersonInput = {
    id?: string
    date: Date | string
    role: string
    eventName?: string | null
    confirmed?: boolean
    ministryId: string
    churchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VolunteerScaleUpdateWithoutPersonInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ministry?: MinistryUpdateOneRequiredWithoutScalesNestedInput
    church?: ChurchUpdateOneRequiredWithoutVolunteerScalesNestedInput
  }

  export type VolunteerScaleUncheckedUpdateWithoutPersonInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    ministryId?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VolunteerScaleUncheckedUpdateManyWithoutPersonInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    ministryId?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VolunteerScaleCreateManyMinistryInput = {
    id?: string
    date: Date | string
    role: string
    eventName?: string | null
    confirmed?: boolean
    personId: string
    churchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VolunteerScaleUpdateWithoutMinistryInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    person?: PersonUpdateOneRequiredWithoutVolunteerScalesNestedInput
    church?: ChurchUpdateOneRequiredWithoutVolunteerScalesNestedInput
  }

  export type VolunteerScaleUncheckedUpdateWithoutMinistryInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    personId?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VolunteerScaleUncheckedUpdateManyWithoutMinistryInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: StringFieldUpdateOperationsInput | string
    eventName?: NullableStringFieldUpdateOperationsInput | string | null
    confirmed?: BoolFieldUpdateOperationsInput | boolean
    personId?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}