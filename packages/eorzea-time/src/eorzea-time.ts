function computeEorzeaDate(date?: Date, existing?: Date): Date {
  if (!existing) existing = new Date();

  const unixTime = Math.floor(
    (date ? date.getTime() : Date.now()) * (1440 / 70),
  );

  existing.setTime(unixTime);
  return existing;
}

export default class EorzeaTime {
  #date: Date;

  constructor(date?: Date) {
    this.#date = computeEorzeaDate(date);
  }

  update(date?: Date): EorzeaTime {
    this.#date = computeEorzeaDate(date, this.#date);
    return this;
  }

  getHours(): number {
    return this.#date.getUTCHours();
  }

  getMinutes(): number {
    return this.#date.getUTCMinutes();
  }

  getSeconds(): number {
    return this.#date.getUTCSeconds();
  }

  toString(): string {
    const hours = this.getHours(),
      minutes = this.getMinutes(),
      seconds = this.getSeconds();

    return `${hours > 9 ? '' : '0'}${hours}:${
      minutes > 9 ? '' : '0'
    }${minutes}:${seconds > 9 ? '' : '0'}${seconds}`;
  }

  toJSON(): string {
    return this.toString();
  }
}
