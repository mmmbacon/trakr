class AddUrlFieldsToJobs < ActiveRecord::Migration[6.1]
  def change
    add_column :jobs, :coverletter_url, :string
    add_column :jobs, :extra_url, :string
  end
end
