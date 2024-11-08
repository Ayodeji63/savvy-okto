import React from 'react';
import { Lightbulb } from 'lucide-react';

interface TipProps {
    tip: string
}
const SavingsTip: React.FC<TipProps> = ({ tip }) => (
    <div className="bg-yellow-100 p-4 rounded-lg flex items-start">
        <Lightbulb className="text-yellow-500 mr-3 mt-1 flex-shrink-0" size={24} />
        <p className="text-sm text-yellow-800">{tip}</p>
    </div>
);

const SavingsTips = () => {
    const tips = [
        "Set clear savings goals to stay motivated.",
        "Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.",
        "Automate your savings to make it effortless.",
        "Review your progress regularly and adjust your strategy as needed.",
    ];

    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Savings Tips</h3>
            <div className="space-y-4">
                {tips.map((tip, index) => (
                    <SavingsTip key={index} tip={tip} />
                ))}
            </div>
        </div>
    );
};

export default SavingsTips;