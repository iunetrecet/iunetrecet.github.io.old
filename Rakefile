
desc "Deploy _site/ to built branch"
task :deploy do
  puts "\n## Deleting built branch"
  status = system("git branch -D built")
  puts status ? "Success" : "Failed"
  puts "\n## Creating new built branch and switching to it"
  status = system("git checkout -b built")
  puts status ? "Success" : "Failed"
  puts "\n## Forcing the _site subdirectory to be project root"
  status = system("git filter-branch --subdirectory-filter _site/ -f")
  puts status ? "Success" : "Failed"
  puts "\n## Switching back to master branch"
  status = system("git checkout master")
  puts status ? "Success" : "Failed"
  puts "\n## Pushing all branches to origin"
  status = system("git push --all origin")
  puts status ? "Success" : "Failed"
end

task :default => [:deploy]
