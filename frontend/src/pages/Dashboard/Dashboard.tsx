import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { DashboardGrid } from '../../components/dashboard';
import { Button } from '../../components/common/Button';
import { FileText } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <>
      <PageHeader
        title="ESG Overview"
        subtitle="Live sustainability metrics, AI insights, and compliance status across your organisation."
        action={
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Export Report
          </Button>
        }
      />
      <DashboardGrid />
    </>
  );
};
