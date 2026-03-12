import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PainPointsProps {
    painPoints: {
        title: string;
        points: string[];
    };
}

export function PainPoints({ painPoints }: PainPointsProps) {
    return (
        <Card className="my-8 border border-gold/30 bg-deep-violet/50 rounded-lg ring-0">
            <CardContent className="p-6 space-y-4">
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
            </CardContent>
        </Card>
    );
}
