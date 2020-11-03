class DreamDestinations

attr_reader :destination, :solo, :transport, :budget

def initialize(destination, solo, transport, budget)
    @destination = destination
    @our_destinations = []
    @solo = solo
    @transport = transport
    @budget = budget
  end


# getters & setters
def choose_ya_destination(destination)
  @our_destinations = ["Mars", "Seven World Wonders", "Ancient civilasations", "Jungle Tripping"]
  puts @our_destinations.
end


end
