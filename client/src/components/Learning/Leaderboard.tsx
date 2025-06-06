
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, Star } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  badges: number;
}

interface LeaderboardProps {
  leaderboardData: LeaderboardEntry[];
  currentUser: { name: string; score: number; badges: number };
}

const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboardData, currentUser }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-sm font-bold text-gray-600">{rank}</div>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-white';
      case 2:
        return 'border-l-gray-400 bg-gradient-to-r from-gray-50 to-white';
      case 3:
        return 'border-l-amber-600 bg-gradient-to-r from-amber-50 to-white';
      default:
        return 'border-l-blue-500 bg-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current User Stats */}
      <Card className="border-2 border-primary">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-primary" />
            <span>Your Stats</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{currentUser.score}</div>
              <div className="text-sm text-gray-600">Total Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{currentUser.badges}</div>
              <div className="text-sm text-gray-600">Badges Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">--</div>
              <div className="text-sm text-gray-600">Current Rank</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span>Top Learners</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {leaderboardData.map((entry, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 border-l-4 ${getRankColor(entry.rank)} ${
                  index !== leaderboardData.length - 1 ? 'border-b' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  {getRankIcon(entry.rank)}
                  <div>
                    <div className="font-semibold text-gray-900">{entry.name}</div>
                    <div className="text-sm text-gray-600">
                      {entry.badges} badge{entry.badges !== 1 ? 's' : ''} earned
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{entry.score.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">points</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievement Levels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-purple-500" />
            <span>Achievement Levels</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🌟</div>
                <div>
                  <div className="font-semibold text-green-800">Learning Enthusiast</div>
                  <div className="text-sm text-green-600">Complete 5 lessons</div>
                </div>
              </div>
              <Badge className="bg-green-500">1000 pts</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🚀</div>
                <div>
                  <div className="font-semibold text-blue-800">Knowledge Seeker</div>
                  <div className="text-sm text-blue-600">Complete 10 lessons</div>
                </div>
              </div>
              <Badge className="bg-blue-500">2500 pts</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🏆</div>
                <div>
                  <div className="font-semibold text-purple-800">Finance Master</div>
                  <div className="text-sm text-purple-600">Complete all modules</div>
                </div>
              </div>
              <Badge className="bg-purple-500">5000 pts</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
