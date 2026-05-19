class AddResumeUrlToJobs < ActiveRecord::Migration[6.1]
  def change
    add_column :jobs, :resume_url, :string
  end
end
