# todo
# create a function where it will take a param as an integer 1..100 and iterate 6 times and print even if even or odd if odd

# def odd_or_even(num)
#   num.times do |i|
#     if i % 2 == 0
#       puts 'even'
#     else
#       puts 'odd'
#     end
#   end
# end

# odd_or_even(10)

def is_palindrome(sentence)
  words = sentence.split(" ")
  words.each do |word| 
    reverse_word = word.reverse
    if word.downcase == reverse_word.downcase
      puts "'#{word}' is a palindrome"
    end
  end
end

# is_palindrome("My name is Anna and I've got Civic")

# Write a function that concatenates two lists. [a,b,c], [1,2,3] → [a,b,c,1,2,3], output2 = [a,1,b,2,c,3]

def concatenate_lists(array1, array2)
  array1.concat(array2)
end

 concatenate_lists(["a", "b", "c", "d"], [1,2,3])

=begin 
1. create a function where you concatenate two arrays 
1a. array1.length
1b. array2.length
drop_at last
new_array << array1.zip(b)
1b. drop last elements if array1.length and array2.length  
=end

a = ["a", "b", "c", "d"]
b = [1, 2, 3]
def concat_arrays(a, b)
  a.length 
  b.length
  new_a = a.take(3)
  new = new_a.zip(b)
  return new.concat
end

p concat_arrays(["a", "b", "c", "d"], [1, 2, 3])

def concat_arrays(apples, oranges)
  basket = [] 
  smallest_array = apples.length < oranges.length ? apples : oranges
  smallest_array.each_with_index do |value, index| 
    basket.push(value) 
    basket.push(oranges[index]) # basket += [value, oranges[index]] || basket.push(value, oranges[index]) 
  end
  return basket
end