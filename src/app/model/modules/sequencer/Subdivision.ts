export class Subdivision {
    public static readonly OCTAVE_MIN = 3;
    public static readonly OCTAVE_DEFAULT = 0; // no sound
    public static readonly OCTAVE_MAX = 6;

    public static readonly DURATION_MIN = 0;
    public static readonly DURATION_MAX = 1;

    public static readonly VELOCITY_MIN = 0;
    public static readonly VELOCITY_MAX = 127;

    private _octaves: number[];
    private _duration: number;
    private _velocity: number;

    public get octaves(): number[] {
        return this._octaves;
    }
    public set octaves(octaves: number[]) {
        // check: all integer numbers in the valid range
        // ...the UI passes only coherent values...
        this._octaves = octaves;
    }
    public get duration(): number {
        return this._duration;
    }
    public set duration(duration: number) {
        if (duration < Subdivision.DURATION_MIN || duration > Subdivision.DURATION_MAX) {
            throw new Error('error while assigning the duration value');
        }
        this._duration = duration;
    }
    public get velocity(): number {
        return this._velocity;
    }
    public set velocity(velocity: number) {
        if (!Number.isInteger(Number(velocity)) || velocity < Subdivision.VELOCITY_MIN || velocity > Subdivision.VELOCITY_MAX) {
            throw new Error('error while assigning the velocity value');
        }
        this._velocity = velocity;
    }

    public constructor(octaves: number[], duration: number, velocity: number) {
        this.octaves = octaves;
        this.duration = duration;
        this.velocity = velocity;
    }

    public static generateOctaveVector(octaveCount: number): number[] {
        const ret = new Array<number>();
        for (let i = 0; i < octaveCount; i++) {
          ret.push(Subdivision.OCTAVE_DEFAULT);
        }
        return ret;
    }
}
