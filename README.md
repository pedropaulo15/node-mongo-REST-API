To run startup the DB and connect to it from Robo Mongo (3T) the following command will have to be executed.

1. In on terminal tab go to the mongo folder that was created whenever you installed/downloaded.
  Then fire up the DB by running `./mongod --dbpath ~/Documents/mongo-data/` within `ongo/bin` folder.
  on the logs should something like `waiting for connections on port 27017`.

2. To make sure you can execute command to the DB, in a new command line tab you can just run `./mongo` within the bin folder also.
  From here you can start manipulate documents and collections from the DB.