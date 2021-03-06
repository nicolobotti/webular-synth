import { sealed } from '../../../system2/utilities/ClassDecorators';
import { IPitchClass, NoteNames, EnharmonicNames, A4, SD } from './IPitchClass';

@sealed
class PitchClass implements IPitchClass {
    private _pitchClass: NoteNames;

    // cache fields depending on private ones
    private _enharmonicName: EnharmonicNames;
    private _referralFrequency: number;

    private get pitchClassKey(): string {
        return NoteNames[this._pitchClass];
    }
    private get pitchClassValue(): number {
        return this._pitchClass;
    }
    public get pitchClassName(): string {
        return this.pitchClassKey;
    }
    public set pitchClass(pitchClass: NoteNames) {
        this._pitchClass = pitchClass;
        this.updateCache();
    }
    private enharmonicNameKey(): string {
        return EnharmonicNames[this._enharmonicName];
    }
    private enharmonicNameValue(): number {
        return this._enharmonicName;
    }
    public get enharmonicName(): string {
        return this.enharmonicNameKey();
    }
    public get referralFrequency(): number {
        return this._referralFrequency;
    }
    private updateCache(): void {
        // maybe no need to convert to string...
        this._enharmonicName = String(EnharmonicNames[this.pitchClassValue]) !== 'undefined' ?
            this.pitchClassValue : EnharmonicNames.nd;
        this._referralFrequency = A4 * (SD ** (this.pitchClassValue - 9));
    }

    public constructor(pitchClass: NoteNames) {
        this.pitchClass = pitchClass;
    }
}

export class PitchClassesProvider { // fly-weight pattern
    private static _pitchClasses: IPitchClass[];
    private static initialize() {
        if (!this._pitchClasses) {
            this._pitchClasses = new Array<IPitchClass>();
            Object.keys(NoteNames).forEach(element => {
                if (isNaN(parseInt(element, 10))) { // only enum string identifiers
                    this._pitchClasses.push(new PitchClass(NoteNames[element]));
                }
            });
        }
    }
    public static retrieveInstances(): IPitchClass[] {
        this.initialize();
        return this._pitchClasses;
    }
    public static retrieveInstance(id: string): IPitchClass {
        this.initialize();
        let ret: IPitchClass;
        for (let i = 0; i < this._pitchClasses.length; i++) {
            if (this._pitchClasses[i].pitchClassName === id) {
                ret = this._pitchClasses[i];
                break;
            }
        }

        return ret;
    }
}
