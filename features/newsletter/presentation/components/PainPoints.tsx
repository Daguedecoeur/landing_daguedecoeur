import { X } from "lucide-react";

export function PainPoints() {
    return (
        <div className="space-y-4 my-8 p-6 border border-[#d4af37]/30 rounded-lg bg-[#1a1b4b]/50">
            <h3 className="font-cinzel font-bold text-xl text-[#F4EBD0] mb-4">
                Tu as envie de jouer ou de masteriser, mais...
            </h3>
            <ul className="space-y-3">
                <li className="flex gap-3 items-center">
                    <X className="text-red-500 w-5 h-5 flex-shrink-0" />
                    <span>Tu as peur de ne pas connaître les règles ?</span>
                </li>
                <li className="flex gap-3 items-center">
                    <X className="text-red-500 w-5 h-5 flex-shrink-0" />
                    <span>La gestion des chiffres te stresse ?</span>
                </li>
                <li className="flex gap-3 items-center">
                    <X className="text-red-500 w-5 h-5 flex-shrink-0" />
                    <span>Tu ne sais pas par où commencer ?</span>
                </li>
            </ul>
        </div>
    );
}
