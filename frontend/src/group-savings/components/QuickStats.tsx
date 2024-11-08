import React from "react";
import { PiggyBank, TrendingUp, Users } from "lucide-react";

interface StatsProps {
  totalSavings: string;
  growthRate: number;
  totalGroups: number;
}

const QuickStats: React.FC<StatsProps> = ({
  totalSavings,
  growthRate,
  totalGroups,
}) => {
  return (
    <div className="mb-4 flex items-center justify-between rounded-lg bg-white p-3 shadow-sm">
      <div className="flex items-center space-x-4">
        <PiggyBank className="text-green-500" size={20} />
        <div>
          <p className="text-xs text-gray-500">Total Savings</p>
          <p className="text-sm font-bold">${totalSavings.toLocaleString()}</p>
        </div>
      </div>
      <div className="h-8 w-px bg-gray-200"></div>
      <div className="flex items-center space-x-4">
        <TrendingUp className="text-blue-500" size={20} />
        <div>
          <p className="text-xs text-gray-500">Growth Rate</p>
          <p className="text-sm font-bold">{growthRate}%</p>
        </div>
      </div>
      <div className="h-8 w-px bg-gray-200"></div>
      <div className="flex items-center space-x-4">
        <Users className="text-purple-500" size={20} />
        <div>
          <p className="text-xs text-gray-500">Total Groups</p>
          <p className="text-sm font-bold">{totalGroups}</p>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
