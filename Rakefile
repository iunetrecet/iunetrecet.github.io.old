
desc "Deploy _site/ to built branch"
task :deploy do
  puts "\n## Deleting built branch"
  status = system("git branch -D built")
  puts status ? "Success" : "Failed"

  puts "\n## Creating new built branch and switching to it"
  status = system("git checkout -b built")
  puts status ? "Success" : "Failed"

  puts "\n## Building to _site"
  status = system("bundle exec jekyll build")
  puts status ? "Success" : "Failed"

  puts "\n## Staging entire _site"
  status = system("git add -f _site")
  puts status ? "Success" : "Failed"

  puts "\n## Committing a site build at #{Time.now.utc}"
  message = "Build site at #{Time.now.utc}"
  status = system("git commit -m \"#{message}\"")
  puts status ? "Success" : "Failed"

  puts "\n## Forcing the _site subdirectory to be project root"
  status = system("git filter-branch --subdirectory-filter _site/ -f")
  puts status ? "Success" : "Failed"

  puts "\n## Switching back to master branch"
  status = system("git checkout master")
  puts status ? "Success" : "Failed"

  puts "\n## Pushing built branch to origin"
  status = system("git push -f origin built")
  puts status ? "Success" : "Failed"
end

task :default => [:deploy]
