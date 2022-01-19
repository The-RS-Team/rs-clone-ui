import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class LocalStorageService {

    constructor() {
    }

    setItem(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key: string): any {
        try {
            const item: string | null = localStorage.getItem(key);
            if (item)
                return JSON.parse(item);
        } catch (e) {
            return null;
        }
    }

    removeItem(key: string): any {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }
}
