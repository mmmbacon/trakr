class RemoveMiddleNameFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :middlename, :string
  end
end
