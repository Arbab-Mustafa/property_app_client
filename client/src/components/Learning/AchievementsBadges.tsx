
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge as BadgeComponent } from '@/components/ui/badge';
import { Award, Lock } from 'lucide-react';
import { Badge } from '@/lib/learningData';

interface AchievementsBadgesProps {
  userAchievements: string[];
  allBadges: Badge[];
}

const AchievementsBadges: React.FC<AchievementsBadgesProps> = ({ userAchievements, allBadges }) => {
  const earnedBadges = allBadges.filter(badge => userAchievements.includes(badge.id));
  const availableBadges = allBadges.filter(badge => !userAchievements.includes(badge.id));

  return (
    <div className="space-y-6">
      {/* Earned Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-500" />
            <span>Your Achievements ({earnedBadges.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {earnedBadges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                >
                  <div className="text-3xl">{badge.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{badge.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                    <BadgeComponent className="bg-yellow-500 text-white">
                      Earned!
                    </BadgeComponent>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No badges yet!</h3>
              <p className="text-gray-600">Complete lessons and quizzes to earn your first achievement.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5 text-gray-500" />
            <span>Available Achievements ({availableBadges.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableBadges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200 opacity-60"
              >
                <div className="text-3xl grayscale">{badge.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-700">{badge.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{badge.description}</p>
                  <BadgeComponent variant="outline" className="text-gray-500">
                    {badge.requirement}
                  </BadgeComponent>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Badge Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Badge Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">🎯 Learning Milestones</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• First Steps - Complete your first lesson</li>
                <li>• Quiz Master - Score 100% on any quiz</li>
                <li>• Consistent Learner - Complete 5 lessons in a week</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">🏆 Subject Mastery</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Inflation Expert - Master inflation concepts</li>
                <li>• Compound Champion - Understand compound interest</li>
                <li>• Property Pro - Complete all property modules</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementsBadges;
