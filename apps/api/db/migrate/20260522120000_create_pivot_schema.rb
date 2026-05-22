class CreatePivotSchema < ActiveRecord::Migration[7.2]
  def up
    create_table :projects do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.string :key, null: false
      t.string :color, null: false, default: "#5E6AD2"
      t.text :description

      t.timestamps
    end
    add_index :projects, [:user_id, :key], unique: true

    create_table :workflow_states do |t|
      t.references :project, null: false, foreign_key: true
      t.string :name, null: false
      t.string :slug, null: false
      t.integer :position, null: false, default: 0
      t.string :category, null: false, default: "backlog"

      t.timestamps
    end
    add_index :workflow_states, [:project_id, :slug], unique: true

    create_table :issues do |t|
      t.references :project, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.references :workflow_state, null: false, foreign_key: true
      t.integer :number, null: false
      t.string :title, null: false
      t.text :description
      t.string :priority, null: false, default: "none"

      t.timestamps
    end
    add_index :issues, [:project_id, :number], unique: true

    create_table :activities do |t|
      t.references :issue, null: false, foreign_key: true
      t.string :kind, null: false
      t.string :actor_type, null: false, default: "system"
      t.bigint :actor_id
      t.text :body
      t.jsonb :metadata, null: false, default: {}

      t.timestamps
    end
    add_index :activities, [:issue_id, :created_at]

    drop_table :events if table_exists?(:events)
    drop_table :jobs if table_exists?(:jobs)
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
