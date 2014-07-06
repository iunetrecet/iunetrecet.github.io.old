
desc "Deploy _site/ to master branch"
task :deploy do
  puts "\n## Stash index changes on source"
  status = system("git stash")
  puts status ? "Success" : "Failed"

  puts "\n## Deleting master branch"
  status = system("git branch -D master")
  puts status ? "Success" : "Failed"

  puts "\n## Creating new master branch and switching to it"
  status = system("git checkout -b master")
  puts status ? "Success" : "Failed"

  puts "\n## Building to _site"
  status = system("bundle exec jekyll build")
  puts status ? "Success" : "Failed"

  puts "\n## Staging entire _site"
  status = system("git add -f _site")
  puts status ? "Success" : "Failed"

  puts "\n## Committing a site build at #{Time.now.utc}"
  message = "Site built at #{Time.now.utc}"
  status = system("git commit -m \"#{message}\"")
  puts status ? "Success" : "Failed"

  puts "\n## Forcing the _site subdirectory to be project root"
  status = system("git filter-branch --subdirectory-filter _site/ -f")
  puts status ? "Success" : "Failed"

  puts "\n## Switching back to source branch"
  status = system("git checkout source")
  puts status ? "Success" : "Failed"

  puts "\n## Apply stashed changes"
  status = system("git stash apply && git stash drop")
  puts status ? "Success" : "Failed"

  puts "\n## Pushing master branch to origin"
  status = system("git push -f origin master")
  puts status ? "Success" : "Failed"
end

task :default => [:deploy]
