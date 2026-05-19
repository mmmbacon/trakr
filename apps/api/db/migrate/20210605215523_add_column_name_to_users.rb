class AddColumnNameToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :middlename, :string
  end
end
