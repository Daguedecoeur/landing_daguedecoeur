import { X } from "lucide-react";

interface PainPointsProps {
    painPoints: {
        title: string;
        points: string[];
    };
}

export function PainPoints({ painPoints }: PainPointsProps) {
    return (
        <div className="space-y-4 my-8 p-6 border border-gold/30 rounded-lg bg-dark-blue/50">
            <h3 className="font-cinzel font-bold text-xl text-cream mb-4">
                {painPoints.title}
            </h3>
            <ul className="space-y-3">
                {painPoints.points.map((point, index) => (
                    <li key={index} className="flex gap-3 items-center">
                        <X className="text-red-500 w-5 h-5 flex-shrink-0" />
                        <span>{point}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
