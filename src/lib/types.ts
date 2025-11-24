export interface Company {
  id: string;
  name: string;
  logoId: string;
}

export type JobCategory = 'Engineering' | 'Design' | 'Marketing' | 'Sales' | 'Product' | 'Customer Support';
export type ContractType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

export interface Job {
  id: string;
  title: string;
  company: Company;
  location: string;
  category: JobCategory;
  contractType: ContractType;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: 'Submitted' | 'Reviewed' | 'Interviewing' | 'Offered' | 'Rejected';
  submittedAt: string;
}
